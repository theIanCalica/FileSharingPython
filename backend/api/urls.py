from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  FolderViewSet
from user_api.views import *
# Set up the router for viewsets
router = DefaultRouter()
router.register('folder', FolderViewSet, basename='folder')

# Define urlpatterns with both router and custom paths
urlpatterns = [
    path('check-unique/', check_unique, name="check_unique"),
    path('register/', UserRegister.as_view(), name="register"),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
]

# Include the router-generated URLs
urlpatterns += router.urls
