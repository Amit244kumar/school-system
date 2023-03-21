 let flag=0;

//showing password if flag  value is 0 and hiding password if flag value 1

function showPassword()
{

   if(flag==0)
   {
      //open the lock
      document.getElementById('uhw4435hgd').type="text"
      document.getElementById('closed').style.visibility='hidden'
      document.getElementById('open').style.visibility='visible'
      document.getElementsByClassName('key')[0].style.color='green';
      flag=1;
   }
   else{
      //closed the lock
      document.getElementById('uhw4435hgd').type="password"
      document.getElementById('open').style.visibility='hidden'
      document.getElementById('closed').style.visibility='visible'
      document.getElementsByClassName('key')[0].style.color='red';
      flag=0;
   }
}

//Showing admin credential         
function show()
{
   document.getElementById('admin-credential').style.visibility='visible'
}

//hiding admin credential    
function hide()    
{
   document.getElementById('admin-credential').style.visibility='hidden'
}

