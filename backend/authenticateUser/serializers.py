from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from uuid import uuid4
from .models import *



class registerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmazonUsers
        fields = ['id', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        validated_data['username'] = str(uuid4())  # random unique username
        password = validated_data.pop('password')
        user = AmazonUsers(**validated_data)
        user.set_password(password)
        user.save()
        return user
    

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from authenticateUser.models import AmazonUsers  # make sure this path is correct


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email is None or password is None:
            raise serializers.ValidationError("Email and password are required.")

        # Check if user exists before attempting authentication
        try:
            AmazonUsers.objects.get(email=email)
        except AmazonUsers.DoesNotExist:
            raise AuthenticationFailed("User with this email does not exist.")

        # Use Django's authentication system
        user = authenticate(username=email, password=password)  # works if USERNAME_FIELD = 'email'

        if user is None:
            raise AuthenticationFailed("Invalid email or password")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name
        }
