# Generated by Django 4.0.4 on 2022-12-06 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='permission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Email_id', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('Email_id', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('real_name', models.CharField(max_length=15)),
                ('user_name', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=15)),
            ],
        ),
    ]
