# Generated by Django 4.1.1 on 2023-02-22 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bak', '0015_amountcollection_active_customers_active_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='amountcollection',
            name='type',
            field=models.CharField(default='weekly', max_length=100),
        ),
    ]
