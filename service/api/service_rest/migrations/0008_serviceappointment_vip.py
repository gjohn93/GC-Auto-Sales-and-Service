# Generated by Django 4.0.3 on 2022-12-07 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0007_remove_serviceappointment_vip_treatment"),
    ]

    operations = [
        migrations.AddField(
            model_name="serviceappointment",
            name="VIP",
            field=models.BooleanField(default=False),
        ),
    ]
