from django.db import models

# Create your models here.
class Student(models.Model):
    name=models.CharField(max_length=15)
    Admission_no=models.CharField(max_length=20,primary_key=True)
    password=models.CharField(max_length=15)
    def __str__(self):
        return self.name+" ("+self.Admission_no+")"

class personalDetails(models.Model):
    Emailid=models.CharField(max_length=30,primary_key=True)
    Admission_no=models.CharField(max_length=20,default=None)
    personal_phone_no=models.CharField(max_length=10)
    Student_name=models.CharField(max_length=20)
    Father_name=models.CharField(max_length=20)
    Mother_name=models.CharField(max_length=20)
    Phone_no=models.CharField(max_length=10)
    DOB=models.CharField(max_length=15)
    Gender=models.CharField(max_length=8)
    def __str__(self):
        return self.Student_name+"("+self.Father_name+")"

class SchoolDetails(models.Model):
    Emailid=models.CharField(max_length=30,primary_key=True)
    Student_ID=models.CharField(max_length=20)
    Roll_no=models.CharField(max_length=10)
    Class=models.CharField(max_length=5)
    Stream=models.CharField(max_length=15)
    Section=models.CharField(max_length=1)

class AddressDetails(models.Model):
    Emailid=models.CharField(max_length=30,primary_key=True)
    State=models.CharField(max_length=40)
    Area=models.CharField(max_length=30)
    Address=models.CharField(max_length=50)