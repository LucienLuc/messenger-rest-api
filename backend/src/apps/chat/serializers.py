from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

# serializer for room name, get user

class RequestSerializer(serializers.Serializer):
    roomName = serializers.CharField(max_length=50)

class AcceptSerializer(serializers.Serializer):
    roomName = serializers.CharField(max_length=50)
    username = serializers.CharField(max_length=50)