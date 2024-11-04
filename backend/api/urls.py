from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user_api.views import *
from file_management.views import *

# Set up the router for viewsets
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
# router.register('folder', FolderViewSet, basename='folder')

# Define urlpatterns with both router and custom paths
urlpatterns = [
    path("check-unique/", check_unique, name="check_unique"),
    path("register/", UserRegister.as_view(), name="register"),
    path("login/", UserLogin.as_view(), name="login"),
    path("logout/", UserLogout.as_view(), name="logout"),
    path("user-count/", get_user_count, name="user-count"),
    path("change-password/", change_password, name="change_password"),
    path("upload/", file_upload_view, name="file_upload"),
    path("files/<int:pk>/delete/", file_delete_view, name="file-delete"),
    path("files/", file_list_view, name="file-list"),
    path("files/<int:pk>/decrypt/", decrypt_file, name="decrypt-file"),
    path("get-tot-file-size/", get_tot_size, name="get-tot-file-size"),
]

# Include the router-generated URLs
urlpatterns += router.urls
