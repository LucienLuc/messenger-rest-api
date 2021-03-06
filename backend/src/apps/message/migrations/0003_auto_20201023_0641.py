# Generated by Django 3.0.8 on 2020-10-23 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0002_auto_20201023_0548'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='unique_id',
            field=models.UUIDField(default=1, editable=False, primary_key=True, serialize=False, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='message',
            field=models.CharField(max_length=200),
        ),
    ]
