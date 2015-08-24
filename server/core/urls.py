from django.conf.urls import patterns, url
from . import views

urlpatterns = [
    url(r"^$", views.IndexView.as_view(), name="index"),
]
