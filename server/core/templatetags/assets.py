# my_app/templatetags/assets.py
from glob import glob
import re
from django import template
from django.conf import settings

register = template.Library()


def find_files(patterns):
    files = []
    for pattern in patterns:
        files += [re.sub(r'^(public|dist)/', settings.STATIC_URL, f)
                  for f in glob(pattern)]
    return files


class CssAssetsRenderer(template.Node):

    def render(self, context):
        return '\n'.join(['<link rel="stylesheet" href="{0}">'.format(f)
                         for f in find_files(settings.ASSETS['lib']['css'] + settings.ASSETS['css'])])


class JsAssetsRenderer(template.Node):

    def render(self, context):
        return '\n'.join(['<script type="text/javascript" src="{0}"></script>'.format(f)
                         for f in find_files(settings.ASSETS['lib']['js'] + settings.ASSETS['js'])])


@register.tag
def load_assets(parser, token):
    asset_type = token.split_contents()[1]
    if asset_type.lower() == 'css':
        return CssAssetsRenderer()
    elif asset_type.lower() == 'js':
        return JsAssetsRenderer()
    else:
        raise Exception('"{}" template not supported'.format(asset_type))