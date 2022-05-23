# Generated by Django 4.0.4 on 2022-05-23 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editor', '0006_projects_fecha_projects_nombre_projects_privado'),
    ]

    operations = [
        migrations.CreateModel(
            name='Projects2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(default='', max_length=100)),
                ('asginatura', models.CharField(max_length=100)),
                ('curso', models.CharField(max_length=50)),
                ('etiquetas', models.CharField(max_length=200)),
                ('privado', models.BooleanField(null=True)),
                ('usuario', models.CharField(max_length=50)),
                ('fecha', models.DateField(null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Projects',
        ),
    ]
