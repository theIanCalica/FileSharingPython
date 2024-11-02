from django.db import models
from django.contrib.auth.models import User

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='files')  # Link to the built-in User model
    file_name = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name

class SharedFile(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE, related_name='shared_files')
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_files')
    access_level = models.CharField(max_length=50, choices=[('view', 'View'), ('edit', 'Edit')])
    shared_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.file_name} shared with {self.shared_with.username}"

class LinkShare(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE, related_name='link_shares')
    share_link = models.CharField(max_length=255, unique=True)
    expiration_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Link for {self.file.file_name}"


