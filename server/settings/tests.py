"""
tests settings and globals
"""


from .dev import *

INSTALLED_APPS += ('django_nose',)

DATABASES = {
    'default': {'ENGINE': 'django.db.backends.sqlite3',
                'NAME': os.path.join(BASE_DIR, 'test_db.sqlite3')}
}

TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
NOSE_ARGS = ['--logging-level=INFO']
