# Generated by Django 4.0.3 on 2022-12-07 22:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0005_alter_serviceappointment_sales_record"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="serviceappointment",
            name="sales_record",
        ),
        migrations.DeleteModel(
            name="SalesRecordVO",
        ),
    ]
