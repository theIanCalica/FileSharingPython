from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
from datetime import datetime
from django.utils.crypto import get_random_string
import hashlib

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['public_id', 'url']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','password', 'last_login', 'is_superuser', 'username', 'email', 'first_name', 'last_name', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
      
class FolderSerializer(serializers.ModelSerializer):
  class Meta:
    model = Folder
    fields = ['name', 'owner', 'created_at']
    
  def create(self, validated_data):
    folder = Folder(
      name=validated_data['name'],
      owner=validated_data['owner']
    )
    folder.save()
    return folder
  
class FileSerializer(serializers.ModelSerializer):
  class Meta:
    model = File
    fields = ['id', 'file_name', 'file', 'description', 'upload_date', 'is_public', 'user']
  
  def create(self, validated_data):
    file = File(
      file_name=validated_data['file_name'],
      description=validated_data['description']    
    )

class FolderFileSerializer(serializers.ModelSerializer):
  class Meta:
    model = FolderFile
    fields = ['folder', 'file']

class SharedFileSerializer(serializers.ModelSerializer):
  class Meta:
    model = SharedFile
    fields = ['file', 'shared_with', 'access_level', 'shared_date']
    read_only_fields = ['shared_date']
    
    def create(self, validated_data):
        # Custom logic to handle sharing, such as checking for existing shares
        file = validated_data.get('file')
        shared_with = validated_data.get('shared_with')
        access_level = validated_data.get('access_level')
        
        # Optional: Check if this file is already shared with this user
        if SharedFile.objects.filter(file=file, shared_with=shared_with).exists():
            raise serializers.ValidationError("This file is already shared with this user.")
        
        shared_file = SharedFile.objects.create(**validated_data)
        return shared_file

class LinkShareSerializer(serializers.ModelSerializer):
  class Meta:
    model = LinkShare
    fields = ['file', 'share_link', 'expiration_date', 'password', 'created_at']
    read_only_fields = ['share_link', 'created_at']
    def create(self, validated_data):
        # Generate a unique share link if not provided
        validated_data['share_link'] = validated_data.get('share_link') or get_random_string(20)
        
        # Optional: Hash the password if provided
        password = validated_data.get('password')
        if password:
            validated_data['password'] = hashlib.sha256(password.encode()).hexdigest()
        
        # Create the LinkShare instance
        link_share = LinkShare.objects.create(**validated_data)
        return link_share

    def validate_expiration_date(self, value):
        # Optional: Check that the expiration date is in the future
        if value and value <= datetime.now():
            raise serializers.ValidationError("Expiration date must be in the future.")
        return value