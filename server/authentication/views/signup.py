import json

from django.shortcuts import render, redirect
from rest_framework import status, views
from rest_framework.response import Response

from server.core.serializers import LoggedUserSerializer
from ..serializers import SignupSerializer


class SignupView(views.APIView):
    def post(self, request):
        if request.user.is_authenticated():
            return redirect('index')

        serializer = SignupSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.error_messages)

        user = serializer.save()
        return Response(data=LoggedUserSerializer(user, context={'request': request}).data,
                        content_type='application/json')
