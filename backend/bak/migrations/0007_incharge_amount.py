# Generated by Django 4.1.1 on 2023-02-12 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bak', '0006_remove_amountcollection_account_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='incharge',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
