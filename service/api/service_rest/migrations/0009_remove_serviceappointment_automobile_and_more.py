# Generated by Django 4.0.3 on 2022-12-08 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0008_serviceappointment_vip"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="serviceappointment",
            name="automobile",
        ),
        migrations.AddField(
            model_name="serviceappointment",
            name="VIN",
            field=models.CharField(default=1234561237891, max_length=17),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="serviceappointment",
            name="color",
            field=models.CharField(default="blue", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="serviceappointment",
            name="make",
            field=models.CharField(default="camry", max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="serviceappointment",
            name="model",
            field=models.CharField(default="toyota", max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="serviceappointment",
            name="year",
            field=models.SmallIntegerField(default="2000"),
            preserve_default=False,
        ),
    ]
