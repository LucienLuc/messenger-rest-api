import uuid
from django.db import models
from django.contrib.auth import get_user_model as user_model
User = user_model()

class Message(models.Model):
    message = models.CharField(max_length=200)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    unique_id = models.AutoField(primary_key = True)

    def __str__(self):
        return self.message
