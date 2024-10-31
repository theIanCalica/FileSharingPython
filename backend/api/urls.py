from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  FolderViewSet
from user_api.views import *
# Set up the router for viewsets
router = DefaultRouter()
router.register('folder', FolderViewSet, basename='folder')

# Define urlpatterns with both router and custom paths
urlpatterns = [
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', logout, name='logout'), 
]

# Include the router-generated URLs
urlpatterns += router.urls
