from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import *
from rest_framework import status
from .validations import * 
from rest_framework.parsers import MultiPartParser, FormParser
import os
import cloudinary.uploader
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

# Encryption function for AES
def encrypt_file(file_data):
    key = get_random_bytes(32)  # AES-256 requires a 32-byte key
    cipher = AES.new(key, AES.MODE_GCM)  
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(file_data)
    return key, nonce, ciphertext, tag

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def file_list_view(request):
    files = File.objects.filter(user=request.user)  # Get files uploaded by the current user
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def file_upload_view(request):
    files = request.FILES.getlist('files')  
    print(files)
    if not files:
        return Response({"error": "No files uploaded."}, status=status.HTTP_400_BAD_REQUEST)
    responses = []
    for file in files:
        # Read and encrypt file content
        file_data = file.read()
        key, nonce, ciphertext, tag = encrypt_file(file_data)
        
        # Get all the orig file name
        original_filename, _ = os.path.splitext(file.name)
    
    
         # Prepare the Cloudinary upload options
        cloudinary_folder = f"user_{request.user.id}"  # Folder named after user ID
        upload_options = {
            "folder": cloudinary_folder,
            "resource_type": "auto",
            "public_id": original_filename,  # Use original filename without extension
        }
        
        
         # Upload encrypted file to Cloudinary
        try:
            upload_result = cloudinary.uploader.upload(ciphertext, **upload_options)
            cloudinary_url = upload_result.get("secure_url")
            
            # Save details via serializer
            serializer = FileSerializer(data={
                'file_url': cloudinary_url,
                'file_name': original_filename,
                'user': request.user.id
            })
            if serializer.is_valid():
                serializer.save()
                responses.append(serializer.data)  # Collect the serializer data for response
            else:
                print(serializer.errors)  # Log errors if any
        except Exception as e:
            print(f"Failed to upload {file.name} to Cloudinary: {e}")
            return Response({"error": "Failed to upload files."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if responses:
        return Response(responses, status=status.HTTP_201_CREATED)

    return Response({"error": "Files were invalid."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def file_delete_view(request, pk):
    try:
        file_instance = File.objects.get(pk=pk)

        # Check if the user is the owner of the file
        if file_instance.user != request.user:
            return Response({'detail': 'You do not have permission to delete this file.'}, status=status.HTTP_403_FORBIDDEN)

        file_instance.delete()  # Delete the file instance
        return Response(status=status.HTTP_204_NO_CONTENT)
    except File.DoesNotExist:
        return Response({'detail': 'File not found.'}, status=status.HTTP_404_NOT_FOUND)
