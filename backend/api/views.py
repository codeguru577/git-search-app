import os
import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from dotenv import load_dotenv
from .serializers import *
from .models import *
from django.core.cache import cache
# Create your views here.
# View sets provides implementation for CRUD operations by default.
load_dotenv()

def fetch_data(url, headers):
    """Helper function to fetch real data from a given URL."""
    try:
        response = requests.get(url, headers=headers)
        # response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx, 5xx)
        return response.json()
    except requests.exceptions.ConnectionError as e:
        return {}


class SearchView(APIView):
    def post(self, request, *args, **kwargs):
        search_type = request.data.get('search_type')
        search_text = request.data.get('search_text')
        page = request.data.get('page')
        per_page = request.data.get('per_page')
        if not search_text:
            return Response({"error": "search_text is mandatory"}, status=status.HTTP_400_BAD_REQUEST)

        # Create cache key
        cache_key = f"search_{search_type}_{search_text}_{page}_{per_page}"
        cached_result = cache.get(cache_key)
        print("CACHE KEY: ", cache_key)
        if cached_result:
            return Response(cached_result)

            
        # Search based on search type
        if search_type == "user":
            api_url = f"https://api.github.com/search/users?q={search_text}&page={page}&per_page={per_page}"
        elif search_type == "repository":
            api_url = f"https://api.github.com/search/repositories?q={search_text}&page={page}&per_page={per_page}"
        else:
            return Response({"error": "Invalid search type. Choose from 'user' or 'repository'."}, status=status.HTTP_400_BAD_REQUEST)

        # Call GitHub API

        github_token = os.getenv("GITHUB_TOKEN")
        
        if not github_token:
            return Response({"error": "GitHub token not found in environment variables."}, status=500)
        
        headers = {
            "Authorization": f"Bearer {github_token}",
            "Accept": "application/vnd.github.v3+json",
        }

        try:
            response = requests.get(api_url, headers=headers)
            # response = requests.get(api_url)
            
            data = response.json()
            
            if response.status_code != 200:
                return Response({"error": data['message']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            items = data.get('items', [])
            real_data = []

            for item in items:
                item_url = item.get('url')
                if item_url:
                    real_item_data = fetch_data(item_url, headers)
                    real_data.append(real_item_data)

            # Replace the original items with the real data
            data['items'] = real_data

            # Cache the result for 2 hours
            cache.set(cache_key, data, timeout=60*60*2)

            return Response(data)
        except requests.exceptions.ConnectionError as e:
            return Response({"error": 'Failed to connect to github.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        

class ClearCacheView(APIView):
    def post(self, request, *args, **kwargs):
        # Clear all data cached
        cache.clear()
        return Response({"message": "Cache cleared successfully"}, status=status.HTTP_200_OK)