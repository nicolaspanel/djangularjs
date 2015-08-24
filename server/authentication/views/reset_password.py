

from rest_framework import views, status
from rest_framework.response import Response

class ResetPasswordView(views.APIView):
    def post(self, request):
        # do nothing (just an example)
        return Response(status=status.HTTP_200_OK)
