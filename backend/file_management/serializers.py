from rest_framework import serializers
from file_management.models import Folder
from file_management.models import File

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
    