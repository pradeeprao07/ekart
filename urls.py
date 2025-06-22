from django.urls import path
from . import views

urlpatterns = [
    path('dummy-products/', views.dummy_products, name='dummy-products'), # the 'api' from urls.py(be) would be replaced here as 'dmy_pr' and sent to view.py
    path('<str:category>/', views.category_products, name='category-products'),
]
