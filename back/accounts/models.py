from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

def avatar_url_path(instance,filename):
    path = f"accounts/{instance.username}/avatar/{filename}"
    return path

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('이메일을 입력해주세요!')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password,**extra_fields):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser,PermissionsMixin):
    # Django 기본 그룹, 허가권 관리
    objects = UserManager()

    email = models.EmailField(max_length=64,
                              verbose_name=_("email"),
                              unique=True)
    username = models.CharField(unique=True,max_length=30)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False,
                                   help_text=_("Designates whether the user can log into this admin site."))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'

    avatar = models.ImageField(blank=True,null=True,upload_to=avatar_url_path)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

    def get_email(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return "/static/images/default_avatar.png"