from django.db import models

# Create your models here.

class permission(models.Model):
    Email_id=models.CharField(max_length=20)
    def __str__(self):
        return self.Email_id

class Teacher(models.Model):
    Email_id=models.CharField(max_length=20,primary_key=True)
    real_name=models.CharField(max_length=15)
    user_name=models.CharField(max_length=20)
    password=models.CharField(max_length=15)
    def __str__(self):
        return self.real_name+"("+self.Email_id+")"
    
class TeacherPersonalDetails(models.Model):
    Email_id=models.CharField(max_length=40,primary_key=True)
    name=models.CharField(max_length=15)
    lastName=models.CharField(max_length=10)
    phone_no=models.CharField(max_length=10)
    DOB=models.CharField(max_length=20)
    gender=models.CharField(max_length=8)
    state=models.CharField(max_length=25)
    area=models.CharField(max_length=25)
    address=models.CharField(max_length=50)
    def __str__(self):
        return self.name+"("+self.Email_id+")" 
     