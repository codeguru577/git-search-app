import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .models import *
from django.core.cache import cache
# Create your views here.
# Viewsets provides implementation for CRUD operations by default.


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
        print("cache key: ", cache_key)
        if cached_result:
            return Response(cached_result)

        # Search based on search type
        if search_type == "user":
            api_url = f"https://api.github.com/search/users?q={search_text}&page={page}&per_page={per_page}"
        elif search_type == "repository":
            api_url = f"https://api.github.com/search/repositories?q={search_text}&page={page}&per_page={per_page}"
        else:
            return Response({"error": "Invalid search type. Choose from 'user' or 'repository'."}, status=status.HTTP_400_BAD_REQUEST)

        # print(api_url)
        # Call GitHub API
        response = requests.get(api_url)
        
        if response.status_code != 200:
            return Response({"error": "Failed to fetch data from GitHub API"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data = response.json()

        # Cache the result for 2 hours
        cache.set(cache_key, data, timeout=60*60*2)

        return Response(data)

class ClearCacheView(APIView):
    def post(self, request, *args, **kwargs):
        # Clear all data cached
        cache.clear()
        return Response({"message": "Cache cleared successfully"}, status=status.HTTP_200_OK)