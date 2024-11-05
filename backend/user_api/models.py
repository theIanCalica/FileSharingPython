from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    public_id = models.CharField(
        max_length=255, blank=True, null=True, default="pf8iioqsmo9unsmegxrv"
    )
    url = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        default="https://res.cloudinary.com/dzydn2faa/image/upload/v1730799486/pf8iioqsmo9unsmegxrv.jpg",
    )


class Contact(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("resolved", "Resolved"),
    ]
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
