# -*- coding: UTF-8 -*-
from django.template import Template, Context, TemplateSyntaxError
from django.test import TestCase
from django.test.utils import override_settings


FAKE_ASSETS = {'staticUrl': '/static/',
               'lib': {'css': ['public/_/angular/angular-csp.css'],
                       'js': ['public/_/angular/angular.js']},
               'css': [],
               'js': ['public/config.js']}

@override_settings(ASSETS=FAKE_ASSETS)
class TestAssetsTemlatetag(TestCase):
    def setUp(self):
        self.context = {}

    def _render(self, template):
        return Template(template).render(Context(self.context)).strip()

    def test_load_js(self):
        template = """
            {% load assets %}
            {% load_assets js %}
        """
        out = (
            '<script type="text/javascript" src="/static/_/angular/angular.js"></script>\n'
            '<script type="text/javascript" src="/static/config.js"></script>'
        )
        self.assertEqual(self._render(template), out)

    def test_load_css(self):
        template = """
            {% load assets %}
            {% load_assets css %}
        """
        out = (
            '<link rel="stylesheet" href="/static/_/angular/angular-csp.css">'
        )
        self.assertEqual(self._render(template), out)
