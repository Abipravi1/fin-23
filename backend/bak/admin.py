from django.contrib import admin

# Register your models here.
from .models import *

models = [Tokens, Customers, Incharge,AmountCollection,MonthlyLoans, InchargeAcc]

for x in models:
    admin.site.register(x)