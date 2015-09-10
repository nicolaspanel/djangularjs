
from server.util import TestCase


class TestSigninView(TestCase):
    fixtures = ['core_test_data']

    def test_signin_with_username_and_password_credentials(self):
        resp = self.http_post(path='/signin/',
                              data={'username': 'johndoe',
                                    'password': 'password'},
                              expected_status=200)
        self.assertMatchSchema(dict(resp.data), {'username': 'johndoe',
                                                 'email': 'john.doe@foo.bar'})

    def test_signin_with_email_and_password_credentials(self):
        resp = self.http_post(path='/signin/',
                              data={'username': 'john.doe@foo.bar',
                                    'password': 'password'},
                              expected_status=200)
        self.assertMatchSchema(dict(resp.data), {'username': 'johndoe',
                                                 'email': 'john.doe@foo.bar'})

    def test_signin_with_bad_credentials(self):
        self.http_post(path='/signin/',
                       data={'username': 'foo',
                             'password': 'bar'},
                       expected_status=400)
