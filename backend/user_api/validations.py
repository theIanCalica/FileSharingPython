from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def validate_username(data):
  username = data['username'].strip()
  if not username:
    raise ValidationError('A Username is needed')
  return True

def validate_password(data):
  password = data['password'].strip()
  if not password:
    raise ValidationError("A Password is needed")
  return True

# def login_validation(data):
#   username = data['username'].strip()
#   password = data['password'].strip()
  
#   if not 