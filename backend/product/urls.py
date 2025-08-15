from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('products/', addProductView.as_view(), name='product-list'),
]
