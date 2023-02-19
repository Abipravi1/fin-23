from django.contrib import admin

# Register your models here.
from .models import *

models = [Tokens, Customers, Incharge,AmountCollection,MonthlyLoans, InchargeAcc, MonthIntrestCollection]

for x in models:
    admin.site.register(x)