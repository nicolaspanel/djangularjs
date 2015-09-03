from rest_framework import test, status
from voluptuous import Schema

class APITestCase(test.APITestCase):
    def _get_client(self, user):
        client = test.APIClient()
        if user is not None:
            client.force_authenticate(user=user)
        else:
            client.logout()
        return client

    def http_get(self, url, user=None, expected_status=status.HTTP_200_OK):
        resp = self._get_client(user).get(url)
        self.assertEqual(resp.status_code, expected_status)
        return resp

    def http_post(self, url, data, user=None, expected_status=status.HTTP_201_CREATED, data_format='json'):
        resp = self._get_client(user).post(url, data, format=data_format)
        self.assertEqual(resp.status_code,expected_status)
        return resp

    def http_put(self, url, data, user=None, expected_status=status.HTTP_200_OK, data_format='json'):
        resp = self._get_client(user).put(url, data, format=data_format)
        self.assertEqual(resp.status_code, expected_status)
        return resp

    def assertMatchSchema(self, obj, schema):
        Schema(schema)(obj)
