from rest_framework import serializers
from .models import (
    User,
    Comment
)
class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']

        extra_kwargs = {'password' : {
            'write_only' : True,
            'required': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    # def update(self, instance, validated_data):

    #     password = validated_data.pop('password', None)
    #     instance = super(RegisterSerializer, self).update(instance, validated_data)

    #     if password:
    #         instance.set_password(password)
    #         instance.save()

    #     return instance

class ChangePasswordSerializer(serializers.Serializer):
    model = User
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('comment_body')
