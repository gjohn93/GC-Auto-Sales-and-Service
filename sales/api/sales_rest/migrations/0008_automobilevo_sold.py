# Generated by Django 4.0.3 on 2022-12-09 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0007_remove_salesrecord_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False),
        ),
    ]