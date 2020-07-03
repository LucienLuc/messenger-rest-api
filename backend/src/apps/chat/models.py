from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ching = models.CharField(max_length=30)

class Room(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    members = models.ManyToManyField(User, related_name='a')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='b')
    admin = models.ManyToManyField(User, blank=True, related_name='c')
    # messages
    onlineUsers = models.ManyToManyField(User, blank=True, related_name='d')
    #     add a list of notifications
    #         - someone is kicked
    #         - someone is requesting to join
    #         - someone is promoted to admin
    #         - someone is demoted to member
    #         - promoted to creator
    #         - demoted to admin
    #         - someone kicks themselves
    #         - someone is online

    def __str__(self):
        return self.title

class Request(models.Model):
    roomName = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='j')
    requestor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='t')

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='e')
    content = models.CharField(max_length=1000)
    date = models.DateField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='f')