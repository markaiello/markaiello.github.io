

$( document ).ready(function() {
  $("#email").emailautocomplete({
  });
  });

$("#inputButton").on('click',function(){

    var usremail = document.getElementById("email").value
    var usrpassword = document.getElementById("password").value
    
    
  
firebase.auth().createUserWithEmailAndPassword(usremail, usrpassword)
.then((userCredential) => {
  // Signed in 
  var user = userCredential.user;
  window.location = 'index.html'
  // ...
})
.catch((error) => {
  var status = ''
    status = error.message
    $("#status").html(status)
    console.log(error.message)
  // ..
})
})