
from django.shortcuts import render, redirect
from rest_framework import views, status
from rest_framework.response import Response

from server.core.serializers import LoggedUserSerializer
from ..serializers import SigninSerializer


class SigninView(views.APIView):
    def post(self, request):
        if request.user.is_authenticated():
            return redirect('index')

        serializer = SigninSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(status=400, data=serializer.error_messages)

        user = serializer.authenticate()
        if user:
            return Response(data=LoggedUserSerializer(user, context={'request': request}).data)
        else:
            return Response(status=400, data='bad credentials')
