firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      // No user is signed in.
    }
  });
  





$("#inputButton").on('click',function(){

var usremail = document.getElementById("email").value
var usrpassword = document.getElementById("password").value


firebase.auth().signInWithEmailAndPassword(usremail, usrpassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location = 'index.html'
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message)
  });
})

