from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, AbstractUser
from django.contrib.auth.models import PermissionsMixin


class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, password=None, **Kwargs):
        if not email:
            raise ValueError('Users should had an email adress')
        user: User = self.model(
            username = username,
            email = self.normalize_email(email)
        )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, email, password=None, **kwargs):
        user = self.create_user(
            username=username,
            email=email,
            password=password
        )
        user.is_active = True
        user.is_admin = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    last_login = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    objects = UserAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username',]

    @property
    def is_staff(self):
        return self.is_admin
        
    @property
    def is_superuser(self):
        return self.is_admin

    def __str__(self) -> str:
        return self.username