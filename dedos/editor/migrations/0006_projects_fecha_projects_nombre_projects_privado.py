# Generated by Django 4.0.4 on 2022-05-23 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0005_group_projects'),
    ]

    operations = [
        migrations.AddField(
            model_name='projects',
            name='fecha',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='projects',
            name='nombre',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='projects',
            name='privado',
            field=models.BooleanField(null=True),
        ),
    ]