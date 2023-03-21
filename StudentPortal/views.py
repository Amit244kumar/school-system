from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from .models import Student,personalDetails,SchoolDetails,AddressDetails
import json
# Create your views here.

#student portal views 

#validating student for login 
def validation(request):
      if Student.objects.filter(Admission_no=request.POST['user-id']):
            if Student.objects.filter(Admission_no=request.POST['user-id'],password=request.POST['password']):
                  request.session['user-id']=request.POST['user-id']
                  try:
                       email_id=personalDetails.objects.get(Admission_no=request.session['user-id']).Emailid
                  except personalDetails.DoesNotExist:
                        email_id=False
                  print(email_id)
                  if email_id:
                        request.session['email-id']=email_id
                  else:
                        
                        request.session['email-id']=''
                  return HttpResponseRedirect('http://localhost:8000/Student-Portal/student-account')
            else:
                  return HttpResponseRedirect('http://localhost:8000?error=password+is+incorrect')
      else:
            return HttpResponseRedirect('http://localhost:8000?error=username+is+incorrect')

#rendering student account
def student(request):
      try:
            request.session['user-id']
      except KeyError:
            return HttpResponseRedirect('http://localhost:8000?error=somthing+went+wrong')
      else:
            d=dict()
            d['userName']=Student.objects.get(Admission_no=request.session['user-id']).name
            return render(request,'StudentPortal/student.html',{'UN':d})


#logouting  student from student account
def logout(request):
      request.session.clear()
      return HttpResponseRedirect('http://localhost:8000')

#rendering student profile page 
def studentProfile(request):
      try:
            request.session['user-id']
      except KeyError:
            return HttpResponseRedirect('http://localhost:8000')
      else:
            studentDetails=dict()
            studentQuerry=Student.objects.get(Admission_no=request.session['user-id'])
            studentDetails['realname']=studentQuerry.name
            studentDetails['admissionNo']=studentQuerry.Admission_no
            studentDetails['password']=studentQuerry.password
            studentDetails['emailId']=request.session['email-id']
            return render(request,'StudentPortal/studentProfile.html',{'SD':studentDetails})

#rendering student infomation page
def studentInfomation(request):
      try:
            request.session['user-id']
      except KeyError:
            return HttpResponseRedirect('http//:localhost:8000')
      else:
            d=dict()
            if request.session['email-id']:
                  PDetails=personalDetails.objects.get(Emailid=request.session['email-id'])
                  SDetails=SchoolDetails.objects.get(Emailid=request.session['email-id'])
                  ADetails=AddressDetails.objects.get(Emailid=request.session['email-id'])
                  PD=dict()
                  SD=dict()
                  AD=dict()
                  PD['emailid']=PDetails.Emailid
                  PD['personalNo']=PDetails.personal_phone_no
                  PD['studentName']=PDetails.Student_name
                  PD['fatherName']=PDetails.Father_name
                  PD['motherName']=PDetails.Mother_name
                  PD['phoneNo']=PDetails.Phone_no
                  PD['DOB']=Student.objects.get(Admission_no=request.session['user-id']).password
                  PD['gender']=PDetails.Gender
                  
                  SD['studentid']=SDetails.Student_ID
                  SD['rollNo']=SDetails.Roll_no
                  SD['class']=SDetails.Class
                  SD['stream']=SDetails.Stream
                  SD['section']=SDetails.Section
                  
                  AD['state']=ADetails.State
                  AD['area']=ADetails.Area
                  AD['address']=ADetails.Address
                  return render(request,'StudentPortal/studentInformation.html',{'PD':PD,'SD':SD,'AD':AD})
            else:
                  d['fillDetails']='true'
                  d['DOB']=Student.objects.get(Admission_no=request.session['user-id']).password
            return render(request,'StudentPortal/studentInformation.html',{'d':d})

#saving student details   
def saveDetails(request):
      try:
            request.session['user-id']
      except KeyError:
            return HttpResponseRedirect('http//:localhost:8000')
      else:
            PD=personalDetails()
            SD=SchoolDetails()
            AD=AddressDetails()
            #saving personal details
            PD.Emailid=request.GET['email-id']
            PD.Admission_no=request.session['user-id']
            PD.personal_phone_no=request.GET['personal-no']
            PD.Student_name=request.GET['student-name']
            PD.Father_name=request.GET['father-name']
            PD.Mother_name=request.GET['mother-name']
            PD.Phone_no=request.GET['phone-no']
            PD.DOB=Student.objects.get(Admission_no=request.session['user-id']).password
            PD.Gender=request.GET['gender']
           
            
            #saving school details
            SD.Emailid=request.GET['email-id']
            SD.Student_ID=request.GET['student-id']
            SD.Roll_no=request.GET['roll-no']
            SD.Class=request.GET['class']
            SD.Stream=request.GET['stream']
            SD.Section=request.GET['section']
           
            #saving address details
            AD.Emailid=request.GET['email-id']
            AD.State=request.GET['state']
            AD.Area=request.GET['area']
            AD.Address=request.GET['address']
            
            PD.save()
            SD.save()
            AD.save()
            request.session['email-id']=request.GET['email-id']
            return HttpResponse('Details are successfully saved')

#Checking,  is student object is valid and  giving student details for displaying to admin
def studentDetails(request):
      if Student.objects.filter(Admission_no=request.GET['object']):
         studentObject=Student.objects.get(Admission_no=request.GET['object'])
         object1=list()
         try:
            PD=personalDetails.objects.get(Admission_no=request.GET['object'])
            SD=SchoolDetails.objects.get(Emailid=PD.Emailid)
            AD=AddressDetails.objects.get(Emailid=PD.Emailid)
            object1.append(studentObject.name)
            object1.append(studentObject.Admission_no)
            object1.append(studentObject.password)
            object1.append(PD.Emailid)
            object1.append(PD.personal_phone_no)
            object1.append(PD.Father_name)
            object1.append(PD.Mother_name)
            object1.append(PD.Phone_no)
            object1.append(PD.DOB)
            object1.append(PD.Gender)
            object1.append(SD.Student_ID)
            object1.append(SD.Roll_no)
            object1.append(SD.Class)
            object1.append(SD.Stream)
            object1.append(SD.Section)
            object1.append(AD.State)
            object1.append(AD.Area)
            object1.append(AD.Address)
            return HttpResponse(json.dumps(object1))
         except personalDetails.DoesNotExist:
            return HttpResponse(False)
      else:
        return HttpResponse(False)
        
        
  

