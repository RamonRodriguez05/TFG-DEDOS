from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    """
    This is the model used to store the users' data.
    """
    ROLES = (
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
        ('student', 'Student'),
    )
    role = models.CharField(max_length=40, choices=ROLES, blank=True)
    email = models.EmailField(
        verbose_name='Email address',
        max_length=255,
        blank=True,
    )
    company = models.CharField(max_length=40, blank=True)
    city = models.CharField(max_length=40, blank=True)
    country = models.CharField(max_length=40, blank=True)
    about = models.CharField(max_length=450, blank=True)

class Group(models.Model):
    group_name= models.CharField(max_length=50)
    description = models.CharField(max_length=80)