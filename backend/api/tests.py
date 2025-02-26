from django.test import TestCase
from django.core.cache import cache
from rest_framework.test import APIClient
from rest_framework import status

class SearchViewRealEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.search_url = '/api/search/'
        self.clear_cache_url = '/api/clear-cache/'
        cache.clear()  # Clear cache before each test

    def test_search_user_success_real_endpoint(self):
        # Test data
        data = {
            "search_type": "user",
            "search_text": "torvalds"  # A known GitHub username
        }

        # Make the request to Django endpoint
        response = self.client.post(self.search_url, data, format='json')

        # Assert the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("items", response.data)  # GitHub API response should have "items"

        # Check if the result is cached
        cache_key = f"search_user_{data['search_text']}"
        cached_result = cache.get(cache_key)
        self.assertEqual(cached_result, response.data)

    def test_search_repository_success_real_endpoint(self):
        # Test data
        data = {
            "search_type": "repository",
            "search_text": "django"
        }

        # Make the request to your Django endpoint
        response = self.client.post(self.search_url, data, format='json')

        # Assert the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("items", response.data)  # GitHub API response should have "items"

        # Check if the result is cached
        cache_key = f"search_repository_{data['search_text']}"
        cached_result = cache.get(cache_key)
        self.assertEqual(cached_result, response.data)

    def test_search_invalid_search_type_real_endpoint(self):
        # Test data
        data = {
            "search_type": "invalid_type",
            "search_text": "test"
        }

        # Make the request to Django endpoint
        response = self.client.post(self.search_url, data, format='json')

        # Assert the response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Invalid search type. Choose from 'user' or 'repository'."})

    def test_search_missing_search_text_real_endpoint(self):
        # Test data
        data = {
            "search_type": "user",
            "search_text": ""
        }

        # Make the request to Django endpoint
        response = self.client.post(self.search_url, data, format='json')

        # Assert the response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "search_text is mandatory"})

class ClearCacheViewRealEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.clear_cache_url = '/api/clear-cache/'
        cache.set("test_key", "test_value")  # Set some cache data

    def test_clear_cache_success_real_endpoint(self):
        # Make the request
        response = self.client.post(self.clear_cache_url, format='json')

        # Assert the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "Cache cleared successfully"})

        # Check if cache is cleared
        self.assertIsNone(cache.get("test_key"))