# Generated by Django 4.0.3 on 2022-12-13 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0011_alter_salesrecord_automobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='model',
            field=models.CharField(max_length=150, null=True),
        ),
    ]