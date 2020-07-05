from django.db import models

from apps.room.main.models import Room
from django.contrib.auth.models import User

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='e')
    content = models.CharField(max_length=1000)
    date = models.DateField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='f')