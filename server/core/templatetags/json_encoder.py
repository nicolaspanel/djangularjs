import json
from django import template

# Get template.Library instance
register = template.Library()

@register.filter('json')
def dump_json(data):
    return json.dumps(data)
