from django.db import models

# Create your models here.
class Customers(models.Model):
    name = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    contact = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    amount = models.IntegerField(default=0)
    balance = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    date = models.CharField(max_length = 100)
    end_date = models.CharField(max_length=100)
    periods = models.CharField(max_length = 100)
    created_at = models.DateTimeField(auto_now=True)

class MonthlyLoans(models.Model):
    name = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    contact = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    amount = models.IntegerField(default=0)
    start_date = models.CharField(max_length=100)
    end_date = models.CharField(max_length=100)
    intrest = models.CharField(max_length=100)
    total_amount = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    total_paid = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    intrest_paid = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    balance = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now=True)
    
class MonthIntrestCollection(models.Model):
    loan_id = models.IntegerField()
    name = models.CharField(max_length=100)
    date = models.CharField(max_length=100)
    amount = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    created_at = models.DateTimeField(auto_now=True)

class AmountCollection(models.Model):
    loan_id = models.CharField(max_length=100)
    amount = models.IntegerField(default=0)
    collected_by = models.CharField(max_length=100, default="admin")
    date = models.CharField(max_length=100, default=None)
    type = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)
    
class Incharge(models.Model):
    name = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    contact = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    date = models.CharField(max_length=100, blank=True)
    amount = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    total_paid = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    signature = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)

class InchargeAcc(models.Model):
    incharge_id = models.IntegerField()
    amount = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    date = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    
class Vouchers(models.Model):
    voucher_name = models.CharField(max_length=100)
    voucher_type = models.CharField(max_length=100, default="debit")
    amount =  models.DecimalField(default=0, decimal_places=2, max_digits=10)
    description = models.TextField(blank=True)
    date = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)
    
class AmountIn(models.Model):
    name = models.CharField(max_length=100)
    date = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    amount = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    
class Tokens(models.Model):
    username = models.CharField(max_length=100)
    token = models.CharField(max_length=100)
    expire = models.DateTimeField()
    login = models.DateTimeField(auto_now=True)