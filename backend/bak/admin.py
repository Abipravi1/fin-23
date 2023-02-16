from django.contrib import admin

# Register your models here.
from .models import *

models = [Tokens, Customers, Incharge,AmountCollection,MonthlyLoans]

for x in models:
    admin.site.register(x)