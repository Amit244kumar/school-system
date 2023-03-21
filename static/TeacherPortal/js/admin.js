function o()
{
    content=document.getElementById('closed-tab')
    content.removeAttribute('id')
    Arrow=document.getElementsByClassName("arrow")
    Arrow[0].style.visibility='visible';
    Arrow[1].style.visibility='hidden'
}
function closedTab(){
    content=document.getElementsByClassName('email-id-permission')
    content[0].setAttribute('id','closed-tab')
    Arrow=document.getElementsByClassName("arrow")
    Arrow[0].style.visibility='hidden';
    Arrow[1].style.visibility='visible';
}

//showing admin credential from screen 
function show()
{   
    document.getElementById('admin-credential').style.visibility='visible'
}
//hiding admin credential from screen 
function hide()    
{
   document.getElementById('admin-credential').style.visibility='hidden'
}

//validating email id
function Emailvalidation()
{
    emailId=new String 
    emailId=document.getElementById("email-id-for-permission").value.toLowerCase()  
    if(emailId=='')
    {
        document.getElementById('server-response').innerHTML=''
        document.getElementById("submit-button").style.pointerEvents='all'
        return;
    }
    if(emailId.length>15 &&emailId.endsWith("@gmail.com"))
    {
        if(emailId.indexOf('@')>4)
        {

            checkEmailIsRegister();
        }
        else{
               let error=document.getElementById('server-response')
               error.innerHTML='Email id  format incorrect'
               error.setAttribute('style','color:red')
               document.getElementById("submit-button").style.pointerEvents='none'
        }
    }
    else{
        let error=document.getElementById('server-response')
        error.innerHTML='Email id  format incorrect'
        error.setAttribute('style','color:red')
        document.getElementById("submit-button").style.pointerEvents='none'

    }
}


//checking Email id is register or not before
function checkEmailIsRegister()
{
    let emailId=document.getElementById('email-id-for-permission')
    if(emailId.value!="")
    {
        let input=document.getElementById("submit-button")
        let serverRespones=document.getElementById('server-response')
        let request= new XMLHttpRequest()
        let url='http://localhost:8000/Teacher-Portal/is-Email-register/?email-id='+emailId.value
        request.open('GET',url,true)
        request.send()
        request.onreadystatechange=function(){
            if(request.status==200 && request.readyState==4)
            {
                
                if(request.responseText=='true')
                {
                   //making button Eventable  
                    input.style.pointerEvents='all'
                    serverRespones.innerHTML=""
                }
                else{
                    //making button uneventable
                    input.style.pointerEvents='none'
                    serverRespones.innerHTML="This id is already register  before"
                    serverRespones.setAttribute('style','color:red')
                }
            }
        }
    }
    
}


//registering Email id for sing up
function register_Email_Id()
{
    let emailId=document.getElementById('email-id-for-permission')
    if(emailId.value.trim()=='')
         return;
    let request=new XMLHttpRequest()
    let url='http://localhost:8000/Teacher-Portal/register-email/?email-id='+emailId.value
    request.open('GET',url,true)
    request.send()
    request.onreadystatechange=function(){
         
        if(request.readyState==4 && request.status==200)
        {
              if(request.responseText=='true')
              {
                let response=document.getElementById('server-response')
                response.innerHTML=`Email id <strong>" ${emailId.value}"</strong> is successfully register for sing up` 
                response.setAttribute('style','color:green')
                emailId.value=''
                setTimeout(()=>{
                document.getElementById('server-respons').innerHTML="" 
                },10000)
              }
        }
    }
}

let searchString=undefined

function search()
{
    document.getElementById('ji-rowor433').innerHTML=""           
   let searchObject=document.getElementById('search-input')
   let url=undefined
   let option;
   //checking search box is empty or not 
    if(searchString ==  searchObject.value)
    {
        document.getElementById('data-container').style.display='block'
        return
    }
    else{
         deleteElements()
    }

    searchString=searchObject.value;
    if(searchObject.value)
    {
       //searching for teacher
       if(isNaN(searchObject.value))
       {
            url='http://localhost:8000/Teacher-Portal/teacher-details/?object='+searchObject.value.trim();
            option='teacher'
        }
       else{//searching for student
            url='http://localhost:8000/Student-Portal/student-details/?object='+searchObject.value.trim();
            option='student'
        }

        let request= new XMLHttpRequest()
        request.open('GET',url,true)
        request.send()
        request.onreadystatechange=function(){
            if(request.status==200 && request.readyState==4){
                data=request.responseText.slice(1,request.responseText.length-1).split(",")
                if(request.responseText == 'False')
                {
                    document.getElementById('ji-rowor433').innerHTML="no result"   
                    searchString=undefined        
                }
                else if(option=='teacher'){
                    createHtmlElementsForTeacher(data)
                }
                else{
                    createHtmlElementsForstudent(data)
                    
                }
            }
        }
   }
   else{
    return;
   }
}

//deleting html 
function deleteElements()
{

    const parentElement=document.getElementById('ghdge4-45dft')
    while(parentElement.hasChildNodes())
    {
         parentElement.removeChild(parentElement.firstChild)
    }
}

//creating elements for storing user data
function createHtmlElementsForTeacher(data)
{ 
    text= new Array
    Class=new Array
    
    text=['Eamil id','Name','User name','Password',
    'Last name','Phone no','DOB','Gender','State','Area','Address']
    
    ID=['eamil-id','name','user-name','password',
    'last-name','phone-no','DOB','gender','state','area','address']

    let container=document.getElementById('ghdge4-45dft')
    document.getElementById('jefh-4hf').innerHTML='teacher information'
    document.getElementById('data-container').style.display="block"
      
    for(i=0;i<11;i++)
    {
            //email id div 
            let divTag=document.createElement('div')
            divTag.className='hfgghd-34dfhfdh'
            if(i>5)
            {
                divTag.classList.add('right-side')  
            }
            //creating span for text
            let spanTag1=document.createElement('span')
            spanTag1.className='text'
            spanTag1.setAttribute('id',ID[i])
            spanTag1.appendChild(document.createTextNode(text[i]))
            
            let br=document.createElement('br')

            //Creatign span for user data
            let spanTag2=document.createElement('span')
            spanTag2.className='user-data'
            spanTag2.appendChild(document.createTextNode(data[i].slice(1,data[i].length-1)))
            
            //appending  both span elements
            divTag.appendChild(spanTag1)
            divTag.appendChild(br)
            divTag.appendChild(spanTag2)
            
            //appending div tag into  container 
            container.appendChild(divTag)
    }

   
}


function createHtmlElementsForstudent(data)
{
    let text=['name','admission no','password','email id','personal phone no','father name','mother name','phone no','DOB',
    'gender','student id','roll no','class','stream','section','state','area','address']
    
    let ID=['name','admission-no','password','email-id','personal-phone-no','father-name','mother-name','phone-no','DOB',
    'gender','student-id','roll-no','class','stream','section','state','area','address']
     69
    let container=document.getElementById('ghdge4-45dft')
    document.getElementById('jefh-4hf').innerHTML='student information'
    for(i=0;i<18;i++)
    {
        let divTag=document.createElement('div')
        divTag.className='hfgghd-34dfhfdh'
        if(i>9)
        {   
            divTag.classList.add('right-side')  
            divTag.classList.add('student')  
        }
        //creating span for text
        let spanTag1=document.createElement('span')
        spanTag1.className='text'
        spanTag1.setAttribute('id',ID[i])
        spanTag1.appendChild(document.createTextNode(text[i]))
        
        let br=document.createElement('br')

        //Creatign span for user data
        let spanTag2=document.createElement('span')
        spanTag2.className='user-data'
        spanTag2.appendChild(document.createTextNode(data[i].slice(1,data[i].length-1)))
        
        //appending  both span elements
        divTag.appendChild(spanTag1)
        divTag.appendChild(br)
        divTag.appendChild(spanTag2)
        
        //appending div tag into  container 
        container.appendChild(divTag)
    }

}

function checkINputValue()
{
    let value=document.getElementById('search-input').value
    if(isNaN(value))
    {
        document.getElementById('ji-rowor433').innerHTML='no result'
        return;
    }
    search()
}
//closing teacher or student information
function closed()
{
    document.getElementById('data-container').style.display='none'

}