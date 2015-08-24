
from django.contrib import auth
from django.shortcuts import redirect
from rest_framework import views

class LogoutView(views.APIView):
    def get(self, request):
        auth.logout(request)
        return redirect('index')
