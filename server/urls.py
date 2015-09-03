# -*- coding: UTF-8 -*-
"""
Use `urlpatterns` to list both third parties and modules URLs.

For more information please see: https://docs.djangoproject.com/en/1.8/topics/http/urls/

NOTE: __generator-djangularjs__ may automatically modified this file.
"""

from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^su/', include('django_su.urls')),
    # leave me here #
    url(r'^', include('server.authentication.urls')),
    url(r'^', include('server.core.urls')),
]
