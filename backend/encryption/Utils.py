from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
import os

# AES requires a 32-byte (256-bit) key for AES-256 encryption
AES_KEY = os.getenv('AES_KEY', 'your-32-byte-secret-key-should-be-here')
IV_LENGTH = 16  # AES block size in bytes

def encrypt_file(data):
    # Generate a random IV (Initialization Vector)
    iv = os.urandom(IV_LENGTH)
    
    # Create the cipher and encryptor
    cipher = Cipher(algorithms.AES(AES_KEY.encode()), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    
    # Pad the data to be a multiple of the AES block size (16 bytes)
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(data) + padder.finalize()
    
    # Encrypt the data
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
    
    # Return IV + encrypted data
    return iv + encrypted_data

def decrypt_file(encrypted_data):
    # Split the IV and the actual encrypted data
    iv = encrypted_data[:IV_LENGTH]
    actual_encrypted_data = encrypted_data[IV_LENGTH:]
    
    # Create the cipher and decryptor
    cipher = Cipher(algorithms.AES(AES_KEY.encode()), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    
    # Decrypt the data
    decrypted_padded_data = decryptor.update(actual_encrypted_data) + decryptor.finalize()
    
    # Remove padding
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(decrypted_padded_data) + unpadder.finalize()
    
    return data
