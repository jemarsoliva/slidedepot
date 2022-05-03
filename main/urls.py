from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterViewSet,
    ChangePasswordViewset,
    CommentView,
)

router = DefaultRouter()
router.register('users', RegisterViewSet, basename='users')
urlpatterns = [
    path('api/', include(router.urls)),
    path('comment/', CommentView.as_view(), name='comment'),
    path('api/change-password/', ChangePasswordViewset.as_view(), name='change-password'),
]
