from django.contrib.auth.models import User
from server.util import APITestCase


class TestIndexView(APITestCase):
    fixtures = ['core_test_data']

    def test_get_when_logged_out(self):
        resp = self.http_get('/', expected_status=200)
        self.assertIsNotNone(resp.content)
        self.assertIsNone(resp.context['user'])

    def test_get_when_logged_in(self):
        resp = self.http_get('/',
                             user=User.objects.get(username='johndoe'),
                             expected_status=200)
        self.assertIsNotNone(resp.content)
        self.assertMatchSchema(dict(resp.context['user']), {'username': 'johndoe',
                                                            'email': 'john.doe@foo.bar'})
