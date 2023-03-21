from django.shortcuts import render
from TeacherPortal.models import permission,Teacher,TeacherPersonalDetails
from django.http import HttpResponse,HttpResponseRedirect
from StudentPortal.models import Student
import json
# Create your views here.

#exporting this variable into urls file for teacher user name


#All below function are related to admin account

#checing admin is valid and rendering admin page 
def Admin(request):
    try:
         if request.session['username']!='admin':
                raise KeyError
    except KeyError:
        return HttpResponseRedirect('http://localhost:8000')
    else:
        return render(request,'TeacherPortal/AdminPages/admin.html')

#rendering landing page     
def home(request):
    error=dict()
    try:
        error['error']=request.GET['error']
    except KeyError:
        error['error']=''
    return render(request,'TeacherPortal/index.html',{'error':error});


#login validation for teacher and admin 
def loginValidation(request):
        if request.GET['option']=='teacher' and request.POST['user-id']!='admin':
            #Teacher validation
            if Teacher.objects.filter(user_name=request.POST['user-id']):
                if Teacher.objects.filter(user_name=request.POST['user-id'],password=request.POST['password']):
                    request.session['username']=request.POST['user-id']
                    request.session['email-id']=Teacher.objects.get(user_name=request.POST['user-id']).Email_id
                    return HttpResponseRedirect("http://localhost:8000/Teacher-Portal/teacher-account/")
                else:
                   return HttpResponseRedirect('http://localhost:8000?error=password+is+incorrect')
            else:
                return HttpResponseRedirect('http://localhost:8000?error=username+is+incorrect')
        elif request.GET['option']=='admin' and request.POST['user-id']=='admin':
            #Admin validation
            if Teacher.objects.filter(user_name=request.POST['user-id']):
                if Teacher.objects.filter(user_name=request.POST['user-id'],password=request.POST['password']): 
                    request.session['username']='admin'
                    return HttpResponseRedirect("http://localhost:8000/Teacher-Portal/admin-account/")
                else:
                    return HttpResponseRedirect('http://localhost:8000?error=password+is+incorrect')
            else:
                return HttpResponseRedirect('http://localhost:8000?error=username+is+incorrect')
        else:
            return HttpResponseRedirect('http://localhost:8000?error=select+right+option')


#checking Email id has permission to sign up or not
def checkEmailId(request):
    if not permission.objects.filter(Email_id=request.GET['email-id']):
       return HttpResponse(False)
    elif not Teacher.objects.filter(Email_id=request.GET['email-id']):
        return HttpResponse(True)
    return HttpResponse('-1')

#checking username is unique for sign up or not 
def checkUsername(request):
    if not Teacher.objects.filter(user_name=request.GET['username']):
        return HttpResponse(True)
    return HttpResponse(False)

#signing up user 
def signUp(request):
    if request.method=='POST':
        newuser=Teacher()
        newuser.Email_id=request.POST['email-Id']
        newuser.real_name=request.POST['real-name']
        newuser.user_name=request.POST['user-name']
        newuser.password=request.POST['password']
        newuser.save()
        return HttpResponseRedirect('http://localhost:8000?sign-Up=signup+successfully')
    else:
       return HttpResponseRedirect('http://localhost:8000')
    
        
#for logout user
def logout(request):
    request.session.clear()
    return HttpResponseRedirect('http://localhost:8000/')

#rendering admin profile 
def adminProfile(request):
    adminDetails=dict()
    try:
        if request.session['username']=='admin':
            admin=Teacher.objects.get(user_name=request.session['username'])
        else:
            raise KeyError
    except KeyError:
        return HttpResponseRedirect('http://localhost:8000/')
    adminDetails['realname']=admin.real_name
    adminDetails['username']=admin.user_name
    adminDetails['emailid']=admin.Email_id
    adminDetails['password']=admin.password
    return render(request,'TeacherPortal/AdminPages/adminProfile.html',{'AD':adminDetails})

#checking is Email register or not
def isEmailRegister(request):
    #checking is user authorize or not by session
    try:
        if request.session['username']!='admin':
                raise KeyError
    except KeyError:
        #redirecting user to landgin pages
        return HttpResponseRedirect('http://localhost:8000/')
    else:
        #checking email is already in model or not 
        if not permission.objects.filter(Email_id=request.GET['email-id'].lower()):
            return HttpResponse('true')
        else:
            return HttpResponse('false')


#Registering Email id for sing up
def registerEmailId(request):
    #checking is user authorize or not by session
    try:
        if request.session['username']!='admin':
            raise KeyError
    except KeyError:
        #redirecting user to landing pages
        return HttpResponseRedirect('http://localhost:8000/')
    else:
        newEmailId=permission()
        newEmailId.Email_id=request.GET['email-id']
        newEmailId.save()
        return HttpResponse('true')
    
#Checking,  is teacher object is valid and  giving teacher details for displaying to admin
def teacherDetails(request):
    try:
        if request.session['username']!='admin':
            raise KeyError
    except KeyError:
        #redirecting user to landing pages
        return HttpResponseRedirect('http://localhost:8000')
    else:
        try:
            teacherDetails=list()
            if Teacher.objects.filter(user_name=request.GET['object']):
                teacherObject1=Teacher.objects.get(user_name=request.GET['object'])
                teacherObject2=TeacherPersonalDetails.objects.get(Email_id=teacherObject1.Email_id) 
                teacherDetails.append(teacherObject1.Email_id)
                teacherDetails.append(teacherObject1.real_name) 
                teacherDetails.append(teacherObject1.user_name) 
                teacherDetails.append(teacherObject1.password)
                teacherDetails.append(teacherObject2.lastName) 
                teacherDetails.append(teacherObject2.phone_no) 
                teacherDetails.append(teacherObject2.DOB) 
                teacherDetails.append(teacherObject2.gender) 
                teacherDetails.append(teacherObject2.state) 
                teacherDetails.append(teacherObject2.area)
                teacherDetails.append(teacherObject2.address)
                return HttpResponse(json.dumps(teacherDetails))
            else:
                return HttpResponse(False)
        except TeacherPersonalDetails.DoesNotExist:
           return HttpResponse(False)

      
        
#All blow functions are related to teacher account
#Checking teacher is valid and rendering the teacher pages
def teacher(request):
    try:
        request.session['email-id']
    except KeyError:
        return HttpResponseRedirect('http://localhost:8000')
    else:
        t=dict()
        t['real_name']=Teacher.objects.get(Email_id=request.session['email-id']).real_name;
        return render(request,'TeacherPortal/TeacherPages/Teacher.html',{'teacher':t})
    
#rendering teacher profile
def teacherProfile(request):
    try:
        request.session['email-id']
    except KeyError:
        return HttpResponseRedirect('http://localhost:8000') 
    else:
        teacherDetails=dict()
        teacher=Teacher.objects.get(Email_id=request.session['email-id'])
        teacherDetails['realname']=teacher.real_name
        teacherDetails['username']=teacher.user_name
        teacherDetails['emailid']=teacher.Email_id
        teacherDetails['password']=teacher.password
        return render(request,'TeacherPortal/TeacherPages/teacherProfile.html',{'TD':teacherDetails})

#Registring student manually and giving error if student is already registered
def registerStudent(request):
    try:
        request.session['email-id']
    except KeyError:
        return HttpResponseRedirect('http://localhost:8000')
    else:
        if not Student.objects.filter(Admission_no=request.GET['admission-no']):
            newStudent=Student()
            newStudent.name=request.GET['name']
            newStudent.Admission_no=request.GET['admission-no']
            newStudent.password=request.GET['DOB']
            newStudent.save()
            return HttpResponse(True)   
        else:
            return HttpResponse(False)
        

#rendering teacher information page
def teacherinformation(request):
    try:
        request.session['email-id']
    except KeyError:
         return HttpResponseRedirect('http://localhost:8000')
    else:
        detail=dict()
        Object1=Teacher.objects.get(Email_id=request.session['email-id'])
        detail['real_name']=Object1.real_name
        detail['emailId']=request.session['email-id']
        try:
            Object2=TeacherPersonalDetails.objects.get(Email_id=request.session['email-id'])
            detail['real_name']=Object1.real_name
            detail['emailId']=request.session['email-id']
            detail['lastName']=Object2.lastName
            detail['phone_no']=Object2.phone_no
            detail['DOB']=Object2.DOB
            detail['gender']=Object2.gender
            detail['state']=Object2.area
            detail['area']=Object2.state
            detail['address']=Object2.address
            return render(request,'TeacherPortal/TeacherPages/teacherInformation.html',{'details':detail})
        except TeacherPersonalDetails.DoesNotExist:
            return render(request,'TeacherPortal/TeacherPages/teacherInformation.html',{'details':detail})
        
        

#saving teacher information 
def saveInformation(request):
    try:
        request.session['email-id']
    except KeyError:
        return HttpResponse('http://localhost:8000')
    else:
        object=TeacherPersonalDetails()
        object.Email_id=request.GET['email-id']
        object.name=request.GET['name']
        object.lastName=request.GET['last-name']
        object.phone_no=request.GET['phone-no']
        object.DOB=request.GET['DOB']
        object.gender=request.GET['gender']
        object.state=request.GET['state']
        object.area=request.GET['area']
        object.address=request.GET['address']
        object.save()
        return HttpResponse('Details successfully saved')
    

