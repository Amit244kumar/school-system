from django.urls import path
from .views import *

urlpatterns=[
  #This all URLs are related to admin account
  path('check-EmailId/',checkEmailId),#no html file
  path('login-validation/',loginValidation),#no html file
  path('admin-account/',Admin),#html file
  path('check-username/',checkUsername),#no html file
  path('sign-up/',signUp),#no html file
  path('logout/',logout),#no html file
  path('admin-profile/',adminProfile),#html file
  path('is-Email-register/',isEmailRegister),#no html file
  path('register-email/',registerEmailId),#no html file
   
  #This all URLs are related to teacher account
  path("teacher-account/",teacher),#html file
  path('teacher-profile/',teacherProfile),#html file
  path('Register-student/',registerStudent),#no html file
  path('teacher-details/',teacherDetails),#no html file
  path('teacher-information/',teacherinformation),#html file
  path('save-information/',saveInformation),#no html file
]
