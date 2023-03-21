//validating uploaded file is excel file or not
function uploaded()
{
   let uploadedFile=document.getElementById('choose-file')
   if(uploadedFile.value!='')
   {
        let pos_of_dot=uploadedFile.value.lastIndexOf('.')+1;
        let extension=uploadedFile.value.substring(pos_of_dot)
        if(extension!='xlsx' && extension!='csv' && extension!='xlsm' && extension!='xltx')
        {
          document.getElementById('file-uploading-error').innerHTML="upload only excel file"
          uploadedFile.value=''
        }
        else{
          document.getElementById('file-uploading-error').innerHTML=""
          let submit=document.getElementById('submit-file')
          submit.style.userSelect='all'
          submit.style.pointerEvents='all'
        }
   }
   else{
         document.getElementById('file-uploading-error').innerHTML=''
         let submit=document.getElementById('submit-file')
         submit.style.userSelect='all'
         submit.style.pointerEvents='all'
   }
}

let notRegister= new Array
let response =new Array;
//extracting data from excel file
function sendFileDataToServer()
{ 

  let input=document.getElementById('choose-file')
  readXlsxFile(input.files[0]).then(function(data)
  { 
      arrangeDOB(data)
    
      if(data[0][0].toLowerCase()!='name' || data[0][1].toLowerCase()!='admissionno' || data[0][2].toLowerCase()!='dob')
      {
        document.getElementById('file-uploading-error').innerHTML='file must have header'
        return;
      }
      for(row of data)
      {
        if(!row[0] || !row[1] || !row[2])//checking fields are filled or not 
        {
  
             notRegister.push({name:row[0],admissionno:row[1],DOB:row[2],reason:'field must required and must be correct'})
        }
        else if(Number(row[1])==NaN){//checking addmission no is in number or not

            notRegister.push({name:row[0],admissionno:row[1],DOB:row[2],reason:'admission No must be number'})
        }
        else if(row[2])//checking date of birth is correct or not 
        {
         
          let DOB=String(row[2])
          let j=0;
          for(d of DOB)//here checking is there two '-' or not
          {
            if('-'==d)
               j++;
          }     
          if(j!=2)//here checking Date of birth string has two '-' or not
          {
            notRegister.push({name:row[0],admissionno:row[1],DOB:row[2],reason:'DOB must be correct'})
          }  
          else{
            splitDOB=DOB.split('-')
            if(splitDOB[0].length!=2 || splitDOB[1].length!=2 || splitDOB[2].length!=4)//checking DOB is proper or not 
            {

               notRegister.push({name:row[0],admissionno:row[1],DOB:row[2],reason:'DOB must be correct'})     
            }else{
              sendData(row)
              notRegister.push({name:row[0],admissionno:row[1],DOB:row[2],reason:null})
            }
          }
        }
      }
      s=document.getElementById('container').classList='acitve'
      document.getElementById('result-of-student-registration').style.visibility='visible'
      showResultTable()
      console.log(response)
  })
  input.value=''
  document.getElementById('submit-file').style.pointerEvents='none'
  // document.getElementsByTagName('body').className='acitve'
  // document.getElementById('result-of-student-registration').className='acitve'

}

//sending file data to server for registration
function sendData(row)
{
    let request=new XMLHttpRequest()
    let url='http://localhost:8000/Teacher-Portal/Register-student/?name='+row[0]+'&admission-no='+row[1]+'&DOB='+row[2]
    request.open('GET',url,true)
    request.send()  
    request.onreadystatechange=function(){
        if(request.readyState==4 && request.status==200)
        {
              if(request.responseText=='True')
              {
                response.push('true');
              }
              else{
                response.push('already register')
              }
        }
      }
}



function arrangeDOB(data)
{
  let d,temp;
  for(j=1;j<data.length;j++)
  {
    d=String(data[j][2]).split(' ')
    d=d.slice(1,4) 
    if(data[j][2] && d.length == 3){
      d[0]=getMonthAsNumber(d[0])
      temp=d[0]
      d[0]=d[1]
      d[1]=temp
      data[j][2]=d.join('-')
    }
  }
}
//checking month and returning month number 
function getMonthAsNumber(m)
{
    if(m=='Jan')
        return '01'
    else if(m=='Feb')
        return '02'
    else if(m=='Mar')
        return '03'
    else if(m=='Apr')
        return '04'
    else if(m=='may')
        return '05'
    else if(m=='Jun')
        return '06'
    else if(m=='July')
        return '07'
    else if(m=='Agu')
        return '08'
    else if(m=='Sep')
        return '09'
    else if(m=='Oct')
        return '10'
    else if(m=='Nov')
        return '11'
    else if(m=='Dec')
        return '12'
}
//showing the result after student registration
function showResultTable()
{

  let parentTag=document.getElementById('popup-box-content')//accessing popup-box-content div from html file
  let headerTag=document.createElement("table")//creating table container tag 
      headerTag.className='table'//adding id name to table tag
  let tableRow=document.createElement('tr') 
      tableRow.className='table-header'
  let firstSpanTag=document.createElement('th')//creating table head  tag for storing name
    firstSpanTag.appendChild(document.createTextNode('name'))//adding text to table head tag
    firstSpanTag.className='name'//adding class name to table head tag
    tableRow.appendChild(firstSpanTag)
    headerTag.appendChild(tableRow)// adding this table head tag to html file

  let secondSpanTag=document.createElement('th')//creating table head tag for storing admission no
    secondSpanTag.appendChild(document.createTextNode("addmission No"))//adding text to table head tag
    secondSpanTag.className='admission-no'//adding class name to table head tag
    tableRow.appendChild(secondSpanTag)
    headerTag.appendChild(tableRow)// adding this table head tag to html file

  let thirdSpanTag=document.createElement('th')//creating table head tag for storing DOB
    thirdSpanTag.appendChild(document.createTextNode("DOB"))//adding text to table head tag
    thirdSpanTag.className='DOB'//adding class name to table head tag
    tableRow.appendChild(thirdSpanTag)
    headerTag.appendChild(tableRow)// adding this table head tag to html file

  let fourthSpanTag=document.createElement('th')//creating span tag for storing reason
    fourthSpanTag.appendChild(document.createTextNode("reason"))//adding text to table head tag
    fourthSpanTag.className='reason'//adding class name to table head tag
    tableRow.appendChild(fourthSpanTag)
    headerTag.appendChild(tableRow)// adding this table head tag to html file

  let fifthSPanTag=document.createElement('th')//creating table head tag for storing status
    fifthSPanTag.appendChild(document.createTextNode("Status"))//adding text to table head tag
    fifthSPanTag.className='status'//adding class name to table head tag
    tableRow.appendChild(fifthSPanTag)
    headerTag.appendChild(tableRow)// adding this table head tag to html file
    
    parentTag.appendChild(headerTag)
    j=0;
  for(i=1;i<notRegister.length;i++)
  {
      tableRow=document.createElement('tr') //creating table row container tag 
      tableRow.className='table-data'//adding class name to table row tag
      firstSpanTag=document.createElement('td')//creating table data tag for storing name
      firstSpanTag.appendChild(document.createTextNode(notRegister[i].name))//adding text to table data tag
      firstSpanTag.className='name'//adding class name to table data tag
      tableRow.appendChild(firstSpanTag)// adding this table data tag to under table tag 
      headerTag.appendChild(tableRow)

      secondSpanTag=document.createElement('td')//creating table data tag for storing admission no
      secondSpanTag.appendChild(document.createTextNode(notRegister[i].admissionno))//adding text to span tag
      secondSpanTag.className='admission-no'//adding class name to span tag
      tableRow.appendChild(secondSpanTag)// adding this span tag to html file
      headerTag.appendChild(tableRow)

      thirdSpanTag=document.createElement('td')//creating span tag for storing DOB
      thirdSpanTag.appendChild(document.createTextNode(notRegister[i].DOB))//adding text to span tag
      thirdSpanTag.className='DOB'//adding class name to span tag
      tableRow.appendChild(thirdSpanTag)// adding this span tag to html file
      headerTag.appendChild(tableRow)  

      fourthSpanTag=document.createElement('td')//creating span tag for storing reason
      if(notRegister[i].reason)
          fourthSpanTag.appendChild(document.createTextNode(notRegister[i].reason))//adding text to span tag
      else{
         fourthSpanTag.appendChild(document.createTextNode(response[j++]))//adding text to span tag
      }
      fourthSpanTag.className='reason'//adding class name to span tag
      tableRow.appendChild(fourthSpanTag)// adding this span tag to html file
      headerTag.appendChild(tableRow)
      

      fifthSPanTag=document.createElement('td')//creating span tag for storing status 
       if(notRegister[i].reason=='true'){
          fifthSPanTag.innerHTML='<i class="fa-solid fa-check" style="color:green;"></i>'//adding status right icon 
       }
       else{
          fifthSPanTag.innerHTML='<i class="fa-sharp fa-solid fa-xmark" style="color:red;"></i>'//adding status across icon
       }
       fifthSPanTag.className='status'//adding class name to span tag

       tableRow.appendChild(fifthSPanTag)//adding this span tag to html file
       headerTag.appendChild(tableRow) 

       parentTag.appendChild(headerTag)
   }

}



//validating student registration 
function register()
{
    let admissionNo=document.getElementById('student-admisson-no')
    let DOB=document.getElementById('DOB')
    let name=document.getElementById('student-name')
    let errorMsg=document.getElementById('student-registration-error')
    let splitDOB=DOB.value.split('-')
    let temp=splitDOB[0]
    splitDOB[0]=splitDOB[2]
    splitDOB[2]=temp
    if(name.value=='')
    {
       errorMsg.innerHTM='enter name'
    }
    else{
      errorMsg.innerHTML=''
    }
    if(admissionNo.value=='')
    {
      errorMsg.innerHTML='enter admission no'
      return;
    }
    else{
      errorMsg.innerHTML=''
    }
    if(DOB.value=='')
    {
      errorMsg.innerHTML='enter DOB'
      return;
    }
    else{
      errorMsg.innerHTML=''
    }
    
    let url='http://localhost:8000/Teacher-Portal/Register-student/?admission-no='+admissionNo.value+'&DOB='+splitDOB.join('-')+'&name='+name.value
    let request=new XMLHttpRequest()
    request.open('GET',url,true)
    request.send()
    request.onreadystatechange=function(){
      if(request.status==200 && request.readyState==4)
      {
        if(request.responseText=='True')
          {
            errorMsg.innerHTML='registered successfully'
            errorMsg.style.color='green'
          }
          else{
            errorMsg.innerHTML='already registered'
            errorMsg.style.color='red'
          }
      }
    }
    admissionNo.value=''
    DOB.value=''
    name.value=''
} 
function closedResult()
{
  
  document.getElementById('result-of-student-registration').style.visibility='hidden'
}

//opening the left side tab
function openTab()
{
    content=document.getElementById('closed-tab')
    content.removeAttribute('id')
    Arrow=document.getElementsByClassName("arrow")
    Arrow[0].style.visibility='visible';
    Arrow[1].style.visibility='hidden'
}
//closing the left side tab
function closedTab(){
    content=document.getElementsByClassName('left-side-bar first-container')
    content[0].setAttribute('id','closed-tab')
    Arrow=document.getElementsByClassName("arrow")
    Arrow[0].style.visibility='hidden';
    Arrow[1].style.visibility='visible';
}
