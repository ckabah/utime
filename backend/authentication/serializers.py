from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    pk = serializers.ReadOnlyField()
    is_admin = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = ['pk', "email", "username", "is_admin", "is_active", 'password', 'password2']
    
    def create(self, validated_data):
        user: User = User(
            username = validated_data['username'],
            email = validated_data['email'],
            )
        password = validated_data['password'],
        password2 = validated_data['password2'],
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must Match'})
        user.set_password(validated_data['password'])
        user.is_active = True
        user.save()
        return user