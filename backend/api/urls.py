from django.urls import path
from .views import LoginView, Register

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('register', Register, name='register')
]
