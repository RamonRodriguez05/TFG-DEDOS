# Generated by Django 3.1.1 on 2020-09-26 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0002_auto_20200925_1409'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='about',
            field=models.CharField(blank=True, max_length=450),
        ),
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AddField(
            model_name='user',
            name='company',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AddField(
            model_name='user',
            name='country',
            field=models.CharField(blank=True, max_length=40),
        ),
    ]