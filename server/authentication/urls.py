
from django.conf.urls import patterns, url

from . import views

urlpatterns = [
    url(r"^logout/$", views.LogoutView.as_view(), name="logout"),
    url(r"^signin/$", views.SigninView.as_view(), name="signin"),
    url(r"^signup/$", views.SignupView.as_view(), name="signup"),
    url(r"^reset_password/$", views.ResetPasswordView.as_view(), name="reset_password"),
]
