from rest_framework import serializers
from django.db import models
from .models import Message
import uuid

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
