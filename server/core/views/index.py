
from django.shortcuts import render
from rest_framework import views

from ..serializers import LoggedUserSerializer

class IndexView(views.APIView):
    def get(self, request):
        if request.user.is_authenticated():
            user = LoggedUserSerializer(request.user, context={'request': request}).data
        else:
            user = None
        return render(request, 'index.html', {'user': user})
