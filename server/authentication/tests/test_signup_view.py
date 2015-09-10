from server.util import TestCase

class TestSignupView(TestCase):
    fixtures = ['core_test_data']

    def test_signup_with_valid_credentials(self):
        resp = self.http_post(path='/signup/',
                              data={'username': 'foo',
                                    'email': 'foo.bar@foo.bar',
                                    'password': 'password'},
                              expected_status=200)
        self.assertMatchSchema(dict(resp.data), {'username': 'foo',
                                                 'email': 'foo.bar@foo.bar'})

    def test_signup_with_already_taken_username(self):
        self.http_post(path='/signup/',
                       data={'username': 'johndoe',
                             'email': 'foo.bar@foo.bar',
                             'password': 'password'},
                       expected_status=400)

    def test_signup_with_already_taken_email(self):
        self.http_post(path='/signup/',
                       data={'username': 'foo',
                             'email': 'john.doe@foo.bar',
                             'password': 'password'},
                       expected_status=400)
