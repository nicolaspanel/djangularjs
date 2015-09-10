from django.contrib.auth.models import User
from server.util import TestCase


class TestIndexView(TestCase):
    fixtures = ['core_test_data']

    def test_get_when_logged_out(self):
        resp = self.http_get(path='/', expected_status=200)
        self.assertIsNotNone(resp.content)
        self.assertIsNone(resp.context['user'])

    def test_get_when_logged_in(self):
        resp = self.http_get(path='/',
                             user=User.objects.get(username='johndoe'),
                             expected_status=200)
        self.assertIsNotNone(resp.content)
        self.assertMatchSchema(dict(resp.context['user']), {'username': 'johndoe',
                                                            'email': 'john.doe@foo.bar'})
