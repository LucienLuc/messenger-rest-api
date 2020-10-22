from django.contrib.auth.models import (
   AbstractBaseUser, PermissionsMixin,
)
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
   #Also makes the username the id for JWT auth
    username = models.CharField(max_length=30, primary_key=True)
    USERNAME_FIELD = 'username'
