# Generated by Django 4.0.3 on 2022-12-08 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0009_remove_serviceappointment_automobile_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="SalesRecordVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("sales_person", models.CharField(max_length=100)),
                ("customer", models.CharField(max_length=100)),
                ("vin", models.CharField(max_length=17, unique=True)),
            ],
        ),
    ]
