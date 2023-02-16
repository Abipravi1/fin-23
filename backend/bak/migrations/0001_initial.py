# Generated by Django 4.1.1 on 2023-02-12 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AmountCollection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('loan_id', models.CharField(max_length=100)),
                ('amount', models.IntegerField(default=0)),
                ('collected_by', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('account_type', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='AmountIn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Customers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('place', models.CharField(max_length=100)),
                ('address', models.TextField(blank=True)),
                ('contact', models.TextField(blank=True)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('amount', models.IntegerField(default=0)),
                ('incharge', models.CharField(max_length=100)),
                ('incharge_id', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('date', models.CharField(max_length=100)),
                ('emd_date', models.CharField(max_length=100)),
                ('periods', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Incharge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('place', models.CharField(max_length=100)),
                ('address', models.TextField(blank=True)),
                ('contact', models.TextField(blank=True)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('signature', models.CharField(blank=True, max_length=100)),
                ('description', models.TextField(blank=True)),
                ('verified', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='MonthlyLoans',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('place', models.CharField(max_length=100)),
                ('address', models.TextField(blank=True)),
                ('contact', models.TextField(blank=True)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('amount', models.IntegerField(default=0)),
                ('incharge', models.CharField(max_length=100)),
                ('incharge_id', models.CharField(max_length=100)),
                ('start_date', models.CharField(max_length=100)),
                ('end_date', models.CharField(max_length=100)),
                ('intrest', models.CharField(max_length=100)),
                ('total_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('description', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Vouchers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('voucher_name', models.CharField(max_length=100)),
                ('voucher_type', models.CharField(default='debit', max_length=100)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('description', models.TextField(blank=True)),
                ('date', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
