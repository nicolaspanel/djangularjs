from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import serializers, validators



class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=30, validators=[validators.UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(validators=[validators.UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(max_length=50)

    def save(self):
        User.objects.create_user(**self.data)
        a_user = authenticate(**self.data)
        login(self.context['request'], a_user)

        user = authenticate(**self.data)
        if user is None:
            return
        login(self.context['request'], user)
        assert user.is_authenticated()
        return user
