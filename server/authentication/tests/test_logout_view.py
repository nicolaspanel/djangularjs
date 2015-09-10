from django.contrib.auth.models import User
from server.util import TestCase

from rest_framework import status

class TestLogoutView(TestCase):
    fixtures = ['core_test_data']

    def test_get(self):
        self.http_get(path='/logout/',
                      user=User.objects.get(username='johndoe'),
                      expected_status=status.HTTP_302_FOUND)
