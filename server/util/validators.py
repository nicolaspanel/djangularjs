from rest_framework import serializers
from voluptuous import Schema, MultipleInvalid, Invalid

class SchemaValidator:
    """
    see also:
      - https://github.com/alecthomas/voluptuous
      - http://www.django-rest-framework.org/api-guide/validators/#writing-custom-validators
    """
    def __init__(self, *args, **kwargs):
        self._schema = Schema(*args, **kwargs)

    def __call__(self, data):
        try:
            self._schema(data)
        except MultipleInvalid as e:
            raise serializers.ValidationError(str(e))
        except Invalid as e:
            raise serializers.ValidationError(str(e))
