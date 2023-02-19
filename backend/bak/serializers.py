from rest_framework import serializers
from .models import *


class Tokensserializers(serializers.ModelSerializer):
    class Meta:
        model = Tokens
        fields = '__all__'
        
        
class CustomersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'
        
class MonthlyLoansSerializers(serializers.ModelSerializer):
    class Meta:
        model = MonthlyLoans
        fields = '__all__'
        
        
class InchargeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Incharge
        fields = '__all__'
        
class AmountCollectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = AmountCollection
        fields = '__all__'
    
class InchargeAccSerializers(serializers.ModelSerializer):
    class Meta:
        model = InchargeAcc
        fields = '__all__'

class MonthIntrestCollectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = MonthIntrestCollection
        fields = '__all__'