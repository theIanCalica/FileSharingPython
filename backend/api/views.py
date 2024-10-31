from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from .models import *
from django.contrib.auth.models import User

class FileViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = File.objects.all()
    serializer_class = FileSerializer
    
    
    def update(self, request, pk=None):
        """Update an existing file"""
        try: 
            file = File.objects.get(pk=pk)
        except File.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, pk=None):
        """ Delete a file by primary key (pk). """
        try:
            file = File.objects.get(pk=pk)
            file.delete()
            return Response({"message": "File deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except File.DoesNotExist:
            return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)
        
class FolderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    
    def get_queryset(self):
        user_id = self.request.user.id  
        return Folder.objects.filter(user_id=user_id)
    
    def perform_create(self, serializer):
        # Automatically associates the folder with the authenticated user
        serializer.save(user=self.request.user)
        
    def destroy(self, request, pk=None):
        """Delete a folder by primary key"""
        try:
            folder = Folder.objects.get(pk=pk)
            folder.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Folder.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)