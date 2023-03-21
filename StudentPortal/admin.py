from django.contrib import admin
from .models import Student,personalDetails,SchoolDetails,AddressDetails
# Register your models here.
admin.site.register(Student)
admin.site.register(personalDetails)
admin.site.register(SchoolDetails)
admin.site.register(AddressDetails)