from rest_framework import serializers

from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    admins = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    onlineUsers = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    requests = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    class Meta:
        model = Room
        fields = '__all__'

    