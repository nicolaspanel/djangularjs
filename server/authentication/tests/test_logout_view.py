from django.contrib.auth.models import User
from server.util import APITestCase

from rest_framework import status

class TestLogoutView(APITestCase):
    fixtures = ['core_test_data']

    def test_get(self):
        self.http_get('/logout/',
                      user=User.objects.get(username='johndoe'),
                      expected_status=status.HTTP_302_FOUND)
