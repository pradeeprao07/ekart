from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import requests

@api_view(['GET'])
def dummy_products(request): 
    response = requests.get('https://dummyjson.com/products') # link to get the data
    products = response.json().get('products', [])
    return JsonResponse({'products': products}) # sends only the products to the frontend

@api_view(['GET'])
def category_products(request, category):
    url = f'https://dummyjson.com/products/category/{category}'
    response = requests.get(url)
    if response.status_code == 200: # success code
        data = response.json()
        return JsonResponse({'products': data.get('products', [])})
    else:
        return JsonResponse({'products': [], 'error': 'Invalid category or fetch failed'}, status=400)
