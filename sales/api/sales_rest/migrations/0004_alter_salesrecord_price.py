# Generated by Django 4.0.3 on 2022-12-08 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_alter_salesrecord_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesrecord',
            name='price',
            field=models.PositiveSmallIntegerField(),
        ),
    ]
