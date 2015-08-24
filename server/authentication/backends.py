from django.contrib.auth.models import User

class EmailBackend(object):

    def authenticate(self, email=None, password=None, **kwargs):
        # Check the email/password and return a User.
        if not isinstance(email, basestring):
            return None
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        else:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
