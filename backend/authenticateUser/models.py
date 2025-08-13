from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import check_password

class AmazonUsers(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=False, null=True, blank=True)

    USERNAME_FIELD = 'email'   
    REQUIRED_FIELDS = ['username']  

    def __str__(self):
        return self.email  

    class Meta:
        verbose_name = 'Amazon User'
        verbose_name_plural = 'Amazon Users'

