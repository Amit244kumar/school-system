function toggleSignUp()
{
  blur=document.getElementById("content-container")
  pop=document.getElementById("sign-up-page")
  blur.classList.toggle("active")
  pop.classList.toggle("active")
  //hidding icons 
  document.getElementById('right-icon').style.visibility='hidden'
  document.getElementById('exclamation-icon').style.visibility='hidden'
  //hidding button
  
}
function toggleLogin()
{
  blur=document.getElementById("content-container")
  pop=document.getElementById("login-page")
  blur.classList.toggle("active")
  pop.classList.toggle("active")
}

function selectBox(option)
{
  const stdopt=document.getElementById("student-option")
  const adopt=document.getElementById("admin-option")
  const tchopt=document.getElementById("teacher-option")
  const input=document.getElementsByClassName('input')
  if(option=='student')
  {
    stdopt.style.backgroundColor='red'
    stdopt.children[1].style.color='white'
    adopt.style.backgroundColor="rgb(208, 204, 204)";
    tchopt.style.backgroundColor="rgb(208, 204, 204)";
    adopt.children[1].style.color="black"
    tchopt.children[1].style.color="black"
    //changing input placeholder value
    input[0].placeholder="Admission id"
  }
  else if(option=='admin'){
    adopt.style.backgroundColor='green'
    adopt.children[1].style.color='white'
    tchopt.style.backgroundColor="rgb(208, 204, 204)";
    stdopt.style.backgroundColor="rgb(208, 204, 204)";
    tchopt.children[1].style.color="black"
    stdopt.children[1].style.color="black"
    input[0].placeholder="username"

  }
  else{
    tchopt.style.backgroundColor='blue'
    tchopt.children[1].style.color='white' 
    adopt.style.backgroundColor="rgb(208, 204, 204)";
    stdopt.style.backgroundColor=" rgb(208, 204, 204)";
    adopt.children[1].style.color="black"
    stdopt.children[1].style.color="black"
    input[0].placeholder="username "
  }
  
}

//validating the user credential
function loginValidation(){
  const radioButtons=document.querySelectorAll("input[name='option']")
  let i=0
  let option=undefined
  for (const f of radioButtons)
  {
    if(f.checked)
    {
       i=1
      option=f.value
    }
  }
  let error=document.getElementById("error-msg-for-option")
  if(i){
    error.innerHTML="";
  }
  else{
    error.innerHTML="select login option"
    return false;
  }

  const AdmissionId=document.getElementsByClassName("input")
  if(AdmissionId[0].value=="")
  {
    let errorMsg=document.getElementById("error-msg-for-input1")
    errorMsg.innerHTML="this fiel is required"
    return false;
  }
  else{
    let errorMsg=document.getElementById("error-msg-for-input1")
    errorMsg.innerHTML=""
  }
  if(AdmissionId[1].value=="")
  {
    let errorMsg=document.getElementById("error-msg-for-input2")
    errorMsg.innerHTML="this fiel is required"
    return false;
  }
  else{
    let errorMsg=document.getElementById("error-msg-for-input2")
    errorMsg.innerHTML=""
  }
  
  if(option=='teacher' || option=='admin'){
     document.getElementById('login-form').action="http://localhost:8000/Teacher-Portal/login-validation/?option="+option
  }
  else{
      document.getElementById('login-form').action="http://localhost:8000/Student-Portal/login-validation/?option="+option
  }
   return true;
}


 
// function sendingdataToServer(url)
// {
//   let i=0;
//   let request= new XMLHttpRequest()
//   request.open('GET',url,true)
//   request.send()
//   request.onreadystatechange=function(){
//       if(request.readyState==4 && request.status==200 )            
//       {
        
//         if(this.responseText!='true'){
//           document.getElementById('message-from-server').innerHTML=this.responseText
//           return false;
//         }else{
//           requestResponse=true;
//         }
//         i=1;
//       }
//     }
//   alert("f")
// }



//checking for Email id is valid for sign up or not
function checkEmailId()
{
  const Email=document.getElementById("email-id")
  const url="/Teacher-Portal/check-EmailId/?email-id="+Email.value
  
  let request= new XMLHttpRequest()
  emailfield=document.getElementById("not-register-email-id")
  rightIcon=document.getElementById('right-icon')
  exclamationIcon=document.getElementById('exclamation-icon') 
  if(Email.value=='')
  {
    emailfield.innerHTML=''
    rightIcon.style.visibility='hidden'
    exclamationIcon.style.visibility='hidden'
    document.getElementById('button').style.pointerEvents='all'
    document.getElementById('button').style.backgroundColor='#00b0ff'            
    return;
  }
  request.open('GET',url,true)
  request.send()  
  request.onreadystatechange=function(){
        if(request.readyState==4 && request.status==200)
        {
            if(this.responseText=='False')
            {
                emailfield.innerHTML="email id haven't permission to sing up"
                exclamationIcon.style.visibility='visible'
                exclamationIcon.style.color='red'
                rightIcon.style.visibility='hidden'
                document.getElementById('button').style.pointerEvents='none'
                document.getElementById('button').style.backgroundColor='#00b0ff6e'
                
            }
            else if(this.responseText=='True'){
                emailfield.innerHTML=''
                rightIcon.style.visibility='visible'
                rightIcon.style.color='#14b314'
                exclamationIcon.style.visibility='hidden'
                document.getElementById('button').style.pointerEvents='all'
                document.getElementById('button').style.backgroundColor='#00b0ff'
                
            }
            else{
                  emailfield.innerHTML="email id is already register"
                  exclamationIcon.style.visibility='hidden'
                  rightIcon.style.visibility='hidden'
                  document.getElementById('button').style.opacity='0.0'
                  setTimeout(() => {
                    document.getElementById('email-id').value=''
                    emailfield.innerHTML=''
                    document.getElementById('button').style.opacity='1.0'
                  },3000);
            }
        }
  }
}


//checking username is unique or not for signing up 
function checkUserName()
{

  const username=document.getElementById('user-name')

  //url server side to check username is unique or not
  url='Teacher-Portal/check-username/?username='+username.value
 
  var request= new XMLHttpRequest()
  request.open('GET',url,true)
  request.send()
  request.onreadystatechange=function(){
    if(request.readyState==4 && request.status==200)
    {
      if(request.responseText=='True')
      {
        username.style.color='#14b314'
        return true;
      }
      else{
          username.style.color='red'

          return false
      }
    }
  }
}



// let er=document.getElementById('login-error')
// if(er.innerHTML!="")
// {
//   popBoX()
// }
// function popBoX()
// {
//   er.classList.add='open-box'
// }


// let er=document.getElementById('signup-error')
// if(er.innerHTML!="")
// {
//   var msg=er.innerHTML
//   er.innerHTML=""
//   alert(msg)
// }
