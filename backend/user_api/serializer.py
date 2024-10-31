from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
from datetime import datetime
from django.utils.crypto import get_random_string
import hashlib
from django.contrib.auth import get_user_model,authenticate
from rest_framework.exceptions import ValidationError

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserModel
    

class UserLoginSerializer(serializers.Serializer):
  username = serializers.CharField(required=True)
  password = serializers.CharField(required=True)
  
  def check_user(self, clean_data):
    user = authenticate(username=clean_data['username'], password=clean_data['password'])
    if not user:
      raise ValidationError('User not found')
    return user

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
      