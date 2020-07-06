# Generated by Django 3.0.8 on 2020-07-06 04:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lobby', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('title', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=200)),
                ('Lobby', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='room_lobby', to='lobby.Lobby')),
                ('admins', models.ManyToManyField(blank=True, related_name='room_admins', to=settings.AUTH_USER_MODEL)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='room_creator', to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(related_name='room_members', to=settings.AUTH_USER_MODEL)),
                ('onlineUsers', models.ManyToManyField(blank=True, related_name='room_online_users', to=settings.AUTH_USER_MODEL)),
                ('requests', models.ManyToManyField(blank=True, related_name='room_requests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]