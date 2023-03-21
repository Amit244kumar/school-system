from django.urls import path
from .views import *

urlpatterns=[
    path('login-validation/',validation),#no html file
    path('student-account/',student),#html file
    path('logout/',logout),#no html file
    path('student-profile/',studentProfile),#html file
    path('student-details/',studentDetails),#no html file 
    path('student-information/',studentInfomation),#html file
    path('save-details/',saveDetails),#no html file
]
