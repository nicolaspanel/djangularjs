from django.contrib.auth.models import User
from server.util import APITestCase


class TestLogoutView(APITestCase):
    fixtures = ['core_test_data']

    def test_get(self):
        self.http_get('/logout/',
                      user=User.objects.get(username='johndoe'),
                      expected_status=302)
