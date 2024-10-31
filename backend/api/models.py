from django.contrib.auth.models import User
from django.db import models

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the built-in User model
    file_name = models.CharField(max_length=255)
    file = models.FileField(upload_to='files/')  # File field for the uploaded file
    description = models.TextField(null=True, blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=True)  # To determine if the file is publicly accessible

    def __str__(self):
        return self.file_name 

class Folder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the user who owns the folder
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class FolderFile(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    
class SharedFile(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE)
    access_level = models.CharField(max_length=50, choices=[('view', 'View'), ('edit', 'Edit')])
    shared_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.file_name} shared with {self.shared_with.username}"
      
class LinkShare(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    share_link = models.CharField(max_length=255, unique=True)
    expiration_date = models.DateTimeField(blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Link for {self.file.file_name}"