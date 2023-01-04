from django.urls import path, include
from rest_framework import routers
from .views import CreateUserView

urlpatterns = [
    #path('', include(router.urls)),
    path('users/', CreateUserView.as_view(), name='users')
]