# Generated by Django 4.0.3 on 2022-12-07 23:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_remove_serviceappointment_sales_record_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='serviceappointment',
            name='VIP_treatment',
        ),
    ]
