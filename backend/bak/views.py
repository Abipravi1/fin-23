from django.shortcuts import render
from .models import *
import secrets
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from datetime import datetime, timedelta, date
from django.db.models import Sum
import math


present_time = datetime.now()

'{:%H:%M:%S}'.format(present_time)
updated_time = datetime.now() + timedelta(hours=20)


@api_view(['POST'])
def loginuser(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if authenticate(username=username, password=password) is not None:
        response_data = {
            'token': setAuth(username),
            'time_expire': updated_time,
            'user': username
        }
        return Response(response_data)
    else:
        return Response({"Error":"Not Logged..."}, status=status.HTTP_401_UNAUTHORIZED)


def setAuth(username):
    authKey = secrets.token_hex(20)
    value = {'username': username, 'token': authKey, 'expire': updated_time }
    expire_time = updated_time
    serializer = Tokensserializers(data=value)
    if serializer.is_valid():
        serializer.save()
    else:
        pass
    return authKey


@api_view(['POST'])
def createUser(request):
    username = request.data.get('username')
    email="admin@email.com"
    password = request.data.get('password')
    try:
        create = User.objects.create_user(username=username,
                                    email=email,
                                    password=password)
        create.save()
        return Response({"status" : "success", "data" :request.data})
    except User:
        return Response({"status":"Error", "data": User})


def check_auth(Authkey):
    present_time = datetime.now()
    '{:%H:%M:%S}'.format(present_time)
    updated_time = datetime.now()
    if Tokens.objects.filter(token=Authkey):
        Auth = Tokens.objects.get(token=Authkey)
        serializer = Tokensserializers(Auth, many=False)
        expire_time = serializer.data.get('expire')
        expire_time = expire_time.replace('Z', "")
        expire_time = datetime.strptime(expire_time, '%Y-%m-%dT%H:%M:%S.%f')
        if updated_time > expire_time:
            return False
        else:
            return True

@api_view(['GET', 'POST'])
def customer_weekly(request, period):
    token = request.headers.get('authorization')
    if (check_auth(token) == True):
        if request.method == 'GET':
            invoices = Customers.objects.filter(periods=period)
            serializers = CustomersSerializers(invoices, many=True)
            return Response(serializers.data)
        else:
            serializer = CustomersSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({'ERROR': 'INVALID DATA!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({"Error": "Not Logged..."}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET', 'PUT', 'DELETE'])
def customer_weekly_details(request, id):
    token = request.headers.get('authorization')
    if check_auth(token) == True:
        if request.method == 'DELETE':
            try:
                data = Customers.objects.get(id=id)
                data.delete()
                return Response({'status': 'deleted'}, status=status.HTTP_204_NO_CONTENT)
            except Customers.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'PUT':
            try:
                data = Customers.objects.get(id=id)
                serializer = CustomersSerializers(instance=data, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'status': 'cannot update'}, status=status.HTTP_400_BAD_REQUEST)
            except Customers.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'GET':
            try:
                data = Customers.objects.get(id=id)
                serializer = CustomersSerializers(data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Customers.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(
            {'status': 'Auth Failed'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'POST'])
def customer_monthly(request):
    token = request.headers.get('authorization')
    if (check_auth(token) == True):
        if request.method == 'GET':
            invoices = MonthlyLoans.objects.all()
            serializers = MonthlyLoansSerializers(invoices, many=True)
            return Response(serializers.data)
        else:
            serializer = MonthlyLoansSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({'ERROR': 'INVALID DATA!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({"Error": "Not Logged..."}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET', 'PUT', 'DELETE'])
def customer_monthy_details(request, id):
    token = request.headers.get('authorization')
    if check_auth(token) == True:
        if request.method == 'DELETE':
            try:
                data = MonthlyLoans.objects.get(id=id)
                data.delete()
                return Response({'status': 'deleted'}, status=status.HTTP_204_NO_CONTENT)
            except MonthlyLoans.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'PUT':
            try:
                data = MonthlyLoans.objects.get(id=id)
                serializer = MonthlyLoansSerializers(instance=data, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'status': 'cannot update'}, status=status.HTTP_400_BAD_REQUEST)
            except MonthlyLoans.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'GET':
            try:
                data = MonthlyLoans.objects.get(id=id)
                serializer = MonthlyLoansSerializers(data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except MonthlyLoans.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(
            {'status': 'Auth Failed'}, status=status.HTTP_401_UNAUTHORIZED)
        
@api_view(['GET', 'POST'])
def incharge(request):
    token = request.headers.get('authorization')
    if (check_auth(token) == True):
        if request.method == 'GET':
            invoices = Incharge.objects.all()
            serializers = InchargeSerializers(invoices, many=True)
            return Response(serializers.data)
        else:
            serializer = InchargeSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({'ERROR': 'INVALID DATA!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({"Error": "Not Logged..."}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET', 'PUT', 'DELETE'])
def incharge_details(request, id):
    token = request.headers.get('authorization')
    if check_auth(token) == True:
        if request.method == 'DELETE':
            try:
                data = Incharge.objects.get(id=id)
                data.delete()
                return Response({'status': 'deleted'}, status=status.HTTP_204_NO_CONTENT)
            except Incharge.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'PUT':
            try:
                data = Incharge.objects.get(id=id)
                serializer = InchargeSerializers(instance=data, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'status': 'cannot update'}, status=status.HTTP_400_BAD_REQUEST)
            except Incharge.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'GET':
            try:
                data = Incharge.objects.get(id=id)
                serializer = InchargeSerializers(data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Incharge.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(
            {'status': 'Auth Failed'}, status=status.HTTP_401_UNAUTHORIZED)
        
        
@api_view(['GET', 'POST'])
def collection(request):
    token = request.headers.get('authorization')
    if (check_auth(token) == True):
        if request.method == 'GET':
            invoices = AmountCollection.objects.all()
            serializers = AmountCollectionSerializers(invoices, many=True)
            return Response(serializers.data)
        else:
            serializer = AmountCollectionSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response({'ERROR': 'INVALID DATA!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response({"Error": "Not Logged..."}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'PUT', 'DELETE'])
def collection_details(request, id):
    token = request.headers.get('authorization')
    if check_auth(token) == True:
        if request.method == 'DELETE':
            try:
                data = AmountCollection.objects.get(id=id)
                data.delete()
                return Response({'status': 'deleted'}, status=status.HTTP_204_NO_CONTENT)
            except AmountCollection.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'PUT':
            try:
                data = AmountCollection.objects.get(id=id)
                serializer = AmountCollectionSerializers(instance=data, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'status': 'cannot update'}, status=status.HTTP_400_BAD_REQUEST)
            except AmountCollection.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
        elif request.method == 'GET':
            try:
                data = AmountCollection.objects.get(id=id)
                serializer = AmountCollectionSerializers(data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except AmountCollection.DoesNotExist:
                return Response({'status': 'id not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(
            {'status': 'Auth Failed'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def weeklyLoanCollection(request):
    id =  request.data.get('customer_id')
    cname =  request.data.get('customer_name')
    amount =  request.data.get('amount')
    date =  request.data.get('date')
    col = AmountCollection.objects.create(loan_id=id,name=cname,amount=amount,date=date)
    col.save()
    customer = Customers.objects.get(id=id)
    balance = int(customer.balance) - int(amount)
    customer.balance = balance
    customer.save()
    return Response({'status':'Success'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def weeklyLoanCollectionUpdate(request, id):
    amount =  request.data.get('amount')
    col = AmountCollection.objects.get(id=id)  
    prev_amount = col.amount
    cust_id = col.loan_id
    cust = Customers.objects.get(id=cust_id)
    balance = cust.balance
    newBal = 0
    if int(prev_amount) < int(amount):
        newBal = int(balance) - (int(amount) - int(prev_amount))
    if int(prev_amount) > int(amount):
        newBal = int(balance) + (int(prev_amount) - int(amount))
    cust.balance = newBal
    cust.save()
    col.amount = amount
    col.save()
    return Response({'status':'Success'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def InchargeCollection(request):
    id =  request.data.get('customer_id')
    cname =  request.data.get('customer_name')
    amount =  request.data.get('amount')
    date =  request.data.get('date')
    col = InchargeAcc.objects.create(incharge_id=id,amount=amount,date=date)
    col.save()
    customer = Incharge.objects.get(id=id)
    paid = int(customer.total_paid) + int(amount)
    customer.total_paid = paid
    customer.save()
    return Response({'status':'Success'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def InchargeCollectionUpdate(request, id):
    amount =  request.data.get('amount')
    col = InchargeAcc.objects.get(id=id)  
    prev_amount = col.amount
    cust_id = col.incharge_id
    cust = Incharge.objects.get(id=cust_id)
    balance = cust.total_paid
    newBal = 0
    if int(prev_amount) < int(amount):
        newBal = int(balance) + (int(amount) - int(prev_amount))
    if int(prev_amount) > int(amount):
        newBal = int(balance) - (int(prev_amount) - int(amount))
    cust.total_paid = newBal
    cust.save()
    col.amount = amount
    col.save()
    return Response({'status':'Success'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def customerCollection(request, pk):
    aa = AmountCollection.objects.filter(loan_id=pk)
    ser = AmountCollectionSerializers(aa, many=True)
    return Response({'status':'Success', 'data':ser.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def monthlyLoanCollection(request):
    id =  request.data.get('customer_id')
    cname =  request.data.get('customer_name')
    amount =  request.data.get('amount')
    date =  request.data.get('date')
    col = AmountCollection.objects.create(loan_id=id,name=cname,amount=amount,date=date, type="monthly")
    col.save()
    customer = MonthlyLoans.objects.get(id=id)
    paid = int(customer.total_paid) + int(amount)
    customer.intrest_paid = balance
    customer.save()
    return Response({'status':'Success'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def monthlyLoanCollectionUpdate(request, id):
    amount =  request.data.get('amount')
    col = AmountCollection.objects.get(id=id)  
    prev_amount = col.amount
    cust_id = col.loan_id
    cust = MonthlyLoans.objects.get(id=cust_id)
    balance = cust.total_paid
    newBal = 0
    if int(prev_amount) < int(amount):
        newBal = int(balance) + (int(amount) - int(prev_amount))
    if int(prev_amount) > int(amount):
        newBal = int(balance) - (int(prev_amount) - int(amount))
    cust.total_amount = newBal
    cust.save()
    col.amount = amount
    col.save()
    return Response({'status':'Success'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def customerCollectionmontlhy(request, pk, id):
    aa = AmountCollection.objects.filter(type=pk).filter(loan_id=id)
    ser = AmountCollectionSerializers(aa, many=True)
    return Response({'status':'Success', 'data':ser.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def calculateCIH(request):
    totalLoans = Customers.objects.aggregate(Sum('amount'))
    totalLoansM = MonthlyLoans.objects.aggregate(Sum('amount'))
    totalincharge = Incharge.objects.aggregate(Sum('amount'))
    totalBalance = Customers.objects.aggregate(Sum('balance'))
    totalBalanceMonthly = MonthlyLoans.objects.aggregate(Sum('total_amount'))
    cih = (int(totalLoans['amount__sum']) + int(totalLoansM['amount__sum'])) - (int(totalincharge['amount__sum']) + int(totalBalance['balance__sum']) + int(totalBalanceMonthly['total_amount__sum']))
    return Response({'status':'Success', 'data': {'LoansWeekly': totalLoans, 'Monthly': totalLoansM, 'BalanceMonthly': totalBalanceMonthly, 'balanceWeekly':totalBalance, 'inchage': totalincharge,'cih':cih}}, status=status.HTTP_200_OK)