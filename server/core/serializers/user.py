from django.contrib.auth.models import User
from rest_framework import serializers


class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class LoggedUserSerializer(BaseUserSerializer):
    pass


class UserSerializer(BaseUserSerializer):
    isLoggedUser = serializers.SerializerMethodField(method_name='is_logged_user')

    def is_logged_user(self, obj):
        return self.context['request'].user == obj
