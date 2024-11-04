from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .serializer import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from .validations import *
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["GET"])
@permission_classes([AllowAny])
def get_user_count(request):
    user_count = User.objects.count()
    return JsonResponse({"user_count": user_count})


class UserRegister(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        clean_data = register_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                user_data = UserObjSerializer(user).data
                return Response(
                    {
                        "user": user_data,
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                    status=status.HTTP_201_CREATED,
                )
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def check_unique(request):
    username = request.query_params.get("username")
    email = request.query_params.get("email")

    is_username_unique = not User.objects.filter(username=username).exists()
    is_email_unique = not User.objects.filter(email=email).exists()

    return Response(
        {
            "is_username_unique": is_username_unique,
            "is_email_unique": is_email_unique,
        }
    )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    serializer = PasswordChangeSerializer(data=request.data)

    # Validate the serializer
    if serializer.is_valid():
        current_password = serializer.validated_data["current_password"]

        # Verify if the current password is correct
        if not user.check_password(current_password):
            return Response(
                {"error": "Current Password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Update the user's password
            user.set_password(serializer.validated_data["new_password"])
            user.save()

            return Response(
                {"message": "Password updated successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "error": "An error occurred while updating the password. Please try again."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            refresh = RefreshToken.for_user(user)
            user_data = UserObjSerializer(user).data
            return Response(
                {
                    "user": user_data,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK,
            )


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        """Retrieve all users with custom behavior (optional)."""
        users = self.get_queryset()
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """Create a new user."""
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """Update an existing user."""
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """Delete a user by primary key (pk)."""
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response(
                {"message": "User deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )


@api_view(["POST"])
@permission_classes([AllowAny])
def create_contact(request):
    data = request.data
    serializer = ContactSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        contact = serializer.save()

        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def contact_list(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def update_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response(
            {"detail": "Contact not found."}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = ContactSerializer(contact, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(
            serializer.data, status=status.HTTP_200_OK
        )  # Change status to HTTP_200_OK

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
