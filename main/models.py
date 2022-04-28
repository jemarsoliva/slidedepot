from datetime import datetime
from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from presentation.models import Presentation


# Create your models here.
class CustomeUserManager(BaseUserManager):
    def _create_user(self, email, password, first_name, last_name, **extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        if not password:
            raise ValueError("Password is not provided")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, first_name, last_name, **extra_fields)

    def create_superuser(self, email, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, first_name, last_name, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(db_index=True, unique=True, max_length=254)
    first_name = models.CharField(max_length=240)
    last_name = models.CharField(max_length=255)

    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = CustomeUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = 'first_name', 'last_name', 'password'
     
    def get_token(self):
        """ get or generate a user token that is valid for
            `settings.AUTH_TOKEN_EXPIRY_TIME`
        """
        token, created = Token.objects.get_or_create(user=self)
        expiry_date = token.created + datetime.timedelta(
            days=settings.AUTH_TOKEN_EXPIRY_TIME)

        if not created and expiry_date < timezone.now():

            token.delete()
            token = Token.objects.create(user=self)

        return token

    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Comment(models.Model):
    user = models.ForeignKey(User, related_name="comments", null=True , on_delete=models.CASCADE)
    presentation = models.ForeignKey(Presentation, related_name="comments", on_delete=models.CASCADE)
    comment_body = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment_body
