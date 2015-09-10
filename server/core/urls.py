# -*- coding: UTF-8 -*-
"""
Use `urlpatterns` to list both both APIViews and viewsets for this module.

NOTE: generator-djangularjs may automatically modified this file. To stay out of trouble please keep the **syntax** below
"""

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r"^$", views.IndexView.as_view(), name="index"),
]
