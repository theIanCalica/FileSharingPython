from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import *
from rest_framework import status
from .validations import *
from rest_framework.parsers import MultiPartParser, FormParser
import os
import cloudinary.uploader
from cloudinary import api
from cloudinary.exceptions import NotFound
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import base64


# Encryption function for AES
def encrypt_file(file_data):
    key = get_random_bytes(32)  # AES-256 requires a 32-byte key
    cipher = AES.new(key, AES.MODE_GCM)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(file_data)
    return key, nonce, ciphertext, tag


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def file_list_view(request):
    files = File.objects.filter(user=request.user)
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def file_upload_view(request):
    files = request.FILES.getlist("files")

    if not files:
        return Response(
            {"error": "No files uploaded."}, status=status.HTTP_400_BAD_REQUEST
        )

    responses = []
    for file in files:
        # Read and encrypt file content
        file_data = file.read()

        # Encrpyt the file
        key, nonce, ciphertext, tag = encrypt_file(file_data)
        cloudinary_folder = f"user_{request.user.id}"

        original_filename, _ = os.path.splitext(file.name)
        file_extension = os.path.splitext(file.name)[1].lower().replace(".", "")
        upload_options = {
            "folder": cloudinary_folder,
            "resource_type": "auto",
        }

        try:
            # Upload encrypted file to Cloudinary
            upload_result = cloudinary.uploader.upload(ciphertext, **upload_options)
            cloudinary_url = upload_result.get("secure_url")
            public_id = upload_result.get("public_id")  # Get the public_id

            # Prepare data for serializer
            serializer_data = {
                "file_name": original_filename,
                "file_url": cloudinary_url,
                "public_id": public_id,  # Include public_id in serializer data
                "user": request.user.id,
                "key": base64.b64encode(key).decode(),
                "nonce": base64.b64encode(nonce).decode(),
                "ciphertext": base64.b64encode(ciphertext).decode(),
                "tag": base64.b64encode(tag).decode(),
                "file_type": file_extension,
            }

            # Create serializer
            serializer = FileSerializer(data=serializer_data)

            if serializer.is_valid():
                serializer.save()
                responses.append(serializer.data)
            else:
                print("Serializer errors:", serializer.errors)  # Log errors if any
        except Exception as e:
            print(f"Failed to upload {file.name} to Cloudinary: {e}")
            return Response(
                {"error": "Failed to upload files."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    if responses:
        return Response(responses, status=status.HTTP_201_CREATED)

    return Response(
        {"error": "Files were invalid."}, status=status.HTTP_400_BAD_REQUEST
    )


def check_resource_exists(public_id):
    """
    Check if a resource exists in Cloudinary.

    :param public_id: The public ID of the resource to check.
    :return: The resource information if found, otherwise None.
    """
    try:
        # Attempt to retrieve the resource information from Cloudinary
        resource_info = api.resource(public_id)
        print("Resource found:", resource_info)  # Debugging output
        return resource_info
    except NotFound:
        # If the resource does not exist, print a message and return None
        print("Resource not found.")
        return None
    except Exception as e:
        # Handle other potential exceptions and log the error
        print(f"Error checking resource: {str(e)}")
        return None


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def file_delete_view(request, pk):
    try:
        # Fetch the file instance
        file_instance = File.objects.get(pk=pk)

        # Check if the user is the owner of the file
        if file_instance.user != request.user:
            return Response(
                {"detail": "You do not have permission to delete this file."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # public_id = file_instance.public_id.strip()
        public_id = "user_1/ek2nv3ftyqf0cpoujz8q"
        # Check if the resource exists in Cloudinary
        resource_info = check_resource_exists(public_id)
        if resource_info is None:
            return Response(
                {"detail": "File not found in Cloudinary."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Attempt to delete the resource from Cloudinary
        try:
            print(file_instance.public_id)  # Log the public ID
            response = cloudinary.uploader.destroy(file_instance.public_id)
            print(f"Cloudinary response: {response}")

            if response.get("result") == "ok":
                # File deleted successfully from Cloudinary
                # Now delete the file instance from the database
                file_instance.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                # Handle error response from Cloudinary
                return Response(
                    {"detail": f"Failed to delete file from Cloudinary: {response}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        except Exception as e:
            return Response(
                {"detail": f"Failed to delete file from Cloudinary: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    except File.DoesNotExist:
        return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)
