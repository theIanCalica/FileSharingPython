from cryptography.fernet import Fernet
import os

# Load the key from an environment variable or a file
def load_key():
    with open('mykey.key', 'rb') as key_file:
        return key_file.read()
      
key = load_key()
cipher = Fernet(key)

def encrypt(data: str) -> bytes:
    """Encrypt the given string data."""
    return cipher.encrypt(data.encode())

def decrypt(encrypted_data: bytes) -> str:
    """Decrypt the given bytes data."""
    return cipher.decrypt(encrypted_data).decode()