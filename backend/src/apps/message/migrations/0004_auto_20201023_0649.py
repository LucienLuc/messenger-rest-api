# Generated by Django 3.0.8 on 2020-10-23 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0003_auto_20201023_0641'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='unique_id',
        ),
        migrations.AlterField(
            model_name='message',
            name='message',
            field=models.CharField(max_length=200, primary_key=True, serialize=False),
        ),
    ]