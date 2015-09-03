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

    def http_get(self, path, user=None, expected_status=status.HTTP_200_OK, **kwargs):
        resp = self._get_client(user).get(**dict({'path': path}, **kwargs))
        self.assertEqual(resp.status_code, expected_status)
        return resp

    def http_post(self, path, data=None, user=None, expected_status=status.HTTP_201_CREATED, **kwargs):
        resp = self._get_client(user).post(**dict({'path': path, 'data': data}, **kwargs))
        self.assertEqual(resp.status_code, expected_status)
        return resp

    def http_put(self, path, data=None, user=None, expected_status=status.HTTP_200_OK, **kwargs):
        resp = self._get_client(user).put(**dict({'path': path, 'data': data}, **kwargs))
        self.assertEqual(resp.status_code, expected_status)
        return resp

    def http_delete(self, path, user=None, expected_status=status.HTTP_200_OK, **kwargs):
        resp = self._get_client(user).delete(**dict({'path': path}, **kwargs))
        self.assertEqual(resp.status_code, expected_status)
        return resp

    def assertMatchSchema(self, obj, schema):
        Schema(schema)(obj)
