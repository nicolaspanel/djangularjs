from django.contrib.auth import authenticate, login
from rest_framework import serializers


class SigninSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=50)

    def to_representation(self, instance):
        return dict(instance, **{'email': instance['username']})

    def authenticate(self):
        user = authenticate(**self.data)
        if user is None:
            return
        login(self.context['request'], user)
        assert user.is_authenticated()
        return user
