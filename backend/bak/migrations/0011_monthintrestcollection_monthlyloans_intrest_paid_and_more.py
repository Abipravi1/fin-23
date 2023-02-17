# Generated by Django 4.1.1 on 2023-02-17 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bak', '0010_alter_amountcollection_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='MonthIntrestCollection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('loan_id', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
                ('date', models.CharField(max_length=100)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AddField(
            model_name='monthlyloans',
            name='intrest_paid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='monthlyloans',
            name='total_paid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]