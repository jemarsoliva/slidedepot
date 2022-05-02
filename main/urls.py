from email.mime import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterViewSet,
    ChangePasswordViewset,
    CommentView,
)

router = DefaultRouter()
router.register('users', RegisterViewSet, basename='users')
# router.register(r'change-password', ChangePasswordViewset, basename='change-password')
# router.register('password',ChangePasswordViewset, basename='password')

urlpatterns = [
    path('api/', include(router.urls)),
    path('comment/', CommentView.as_view(), name='comment'),
    path('api/change-password/', ChangePasswordViewset.as_view(), name='change-password'),
]
