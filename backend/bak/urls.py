from .views import *
from django.urls import path

urlpatterns = [
    path('login/', loginuser),
    path('getcustomer/<str:period>/', customer_weekly),
    path('customer/<str:id>/', customer_weekly_details),
    path('getcustomermonthly/', customer_monthly),
    path('customer/monthly/<str:id>/', customer_monthy_details),
    path('incharge/<str:id>/', incharge_details),
    path('incharge1/', incharge),
    path('collection1/', collection),
    path('collection/<str:id>/', collection_details),
    path("collection/save/weekly/", weeklyLoanCollection),
    path("collection/update/weekly/<str:id>/", weeklyLoanCollectionUpdate),
    path("collection/get/weekly/<str:pk>/", customerCollection),
    path("collection/save/montlhy/", monthlyLoanCollection),
    path("collection/update/montlhy/<str:id>/", monthlyLoanCollectionUpdate),
    path("collection/get/monthly/<str:pk>/<str:id>/", customerCollectionmontlhy),
    path("inchargecollection/", InchargeCollection),
    path("inchargecollection/<str:id>/", InchargeCollectionUpdate),
    path("CIH/", calculateCIH),
]