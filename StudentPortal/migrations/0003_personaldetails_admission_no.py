# Generated by Django 4.0.4 on 2023-02-28 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StudentPortal', '0002_addressdetails_personaldetails_schooldetails'),
    ]

    operations = [
        migrations.AddField(
            model_name='personaldetails',
            name='Admission_no',
            field=models.CharField(default=None, max_length=20),
        ),
    ]
