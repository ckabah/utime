from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import UserSerializer
from .models import User


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
