from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from file_management.models import Folder
from file_management.serializers import FolderSerializer
from users.models import User
# Folder views

#Get all folders based on user id
@api_view(['GET'])
def get_all_folders_based_on_user(request, user_id):
  user = get_object_or_404(User, id=user_id)
  folders = Folder.objects.filter(owner=user)
  serializer = FolderSerializer(folders, many = True)
  return JsonResponse(serializer.data, safe=False)
