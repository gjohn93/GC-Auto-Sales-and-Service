# Generated by Django 4.0.3 on 2022-12-07 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0003_rename_owner_serviceappointment_customer_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="technician",
            name="employee_number",
            field=models.PositiveSmallIntegerField(unique=True),
        ),
    ]
