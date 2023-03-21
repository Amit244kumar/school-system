function Emailvalidation()
{
    emailId=new String 
    emailId=document.getElementById("email").value.toLowerCase()  
    if(emailId=='')
    {
        document.getElementById('server-response').innerHTML=''
        return;
    }
    if(emailId.length>15 &&emailId.endsWith("@gmail.com"))
    {
        if(emailId.indexOf('@')>4)
        {
            let error=document.getElementById('server-response')
            error.innerHTML=''
            
        }
        else{
               let error=document.getElementById('server-response')
               error.innerHTML='Email id  format incorrect'
               error.setAttribute('style','color:red')
        }
    }
    else{
        let error=document.getElementById('server-response')
        error.innerHTML='Email id  format incorrect'
        error.setAttribute('style','color:red')
        // document.getElementById("submit-button").style.pointerEvents='none'

    }
}

//validating all inputs 
function validationOfAllInputs()
{

    let personalDetails=document.getElementsByClassName('df45fgj-55dfg')
    let schoolDetails=document.getElementsByClassName('edf45-gjd3')
    let addressDetails=document.getElementsByClassName('jfh8rhr-fhf7gr')
 
    //validating personal details
    if(!personalDetails[0].value  || !personalDetails[1].value  || !personalDetails[2].value  || !personalDetails[3].value  
       || !personalDetails[4].value  || !personalDetails[5].value ){
       document.getElementById('error').innerHTML='All field must be filled'
       return
    } 
    else if(personalDetails[7].value =='select'){
        let option
        option=document.getElementById('selection-gender-error')
        option.innerHTML='select option'
        option.style.color='red'
        document.getElementById('error').innerHTML='somtheing wend wrong'
        return 
    }
   //validating school details
    if(!schoolDetails[0].value  || !schoolDetails[1].value  || 
        !schoolDetails[2].value  || !schoolDetails[4].value ){
        document.getElementById('error').innerHTML='somtheing wend wrong'
    }
    else if(schoolDetails[3].value == 'select')
    {
        let option
        option=document.getElementById('selection-gender-error')
        option.innerHTML='select option'
        option.style.color='red'
        document.getElementById('error').innerHTML='somtheing wend wrong'
    }
    
    if(!addressDetails[0].value  || !addressDetails[1].value  || !addressDetails[2].value ){
        document.getElementById('error').innerHTML='somtheing wend wrong'
    }
    
    let url='http://localhost:8000/Student-Portal/save-details?email-id='+personalDetails[0].value+'&personal-no='+personalDetails[1].value+'&student-name='+personalDetails[2].value+'&father-name='
    +personalDetails[3].value+'&mother-name='+personalDetails[4].value+'&phone-no='+personalDetails[5].value+'&gender='+personalDetails[7].value+'&student-id='+schoolDetails[0].value+'&roll-no='
    +schoolDetails[1].value+'&class='+schoolDetails[2].value+'&stream='+schoolDetails[3].value+'&section='+schoolDetails[4].value+'&state='+addressDetails[0].value+
    '&area='+addressDetails[1].value+'&address='+addressDetails[2].value

    let request=new XMLHttpRequest()
    request.open('GET',url,true)
    request.send()
    request.onreadystatechange=function(){
        if(request.readyState==4 && request.status == 200){
            document.getElementById('error').innerHTML=request.responseText
            document.getElementById('error').style.color=green
        }
    }
}
