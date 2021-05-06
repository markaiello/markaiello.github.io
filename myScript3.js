window.onload=function(){

// 

  // Get a reference to the database service
  
  var database = firebase.database();
  console.log(database)
  
var dauser;

 
  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       dauser = user
       updateScore();
        var myobjy = document.getElementById("loginButton");
        myobjy.style.display = "none";

        var myobja = document.getElementById("signupbutton");
        myobja.style.display = "none";

        var data = document.createElement("p")
        data.innerText = 'User: ' + user.email

        var x =  document.getElementById("topbar")
        x.append(data);


        const dbRef = firebase.database();
        dbRef.ref('users/' + dauser.uid + '/score').get().then((snapshot) => {
          if (snapshot.exists()) {
            
          } else {
            writeUser(user.uid)
          }
        }).catch((error) => {
          console.error(error);
        });

    } else {
      var myobj4 = document.getElementById("logoutButton");
      myobj4.style.display = "none";
    }
  });

  


  $("#logoutButton").on('click',function(){
    firebase.auth().signOut().then(() => {
      window.location = 'index3.html'
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  })


  

 

  
  function writeUser(id) {
    firebase.database().ref('users/' + id).set({
      score: 0
    });
  }
  function writeUserScore(id,score) {
    firebase.database().ref('users/' + id).set({
      score: score
    });
  }







    var inOnes = [
    '8/8/8/3k4/7R/Q7/PP5B/KP6 w - - 1 1',
    '1R6/8/8/8/8/3K4/8/3k4 w - - 1 1',
    '8/7k/8/8/8/8/2PPP3/B1PKP1Q1 w - - 1 1',
    '3k4/7R/8/8/8/7Q/8/K7 w - - 1 1',
    '3k4/2R4Q/8/8/8/6q1/8/7K w - - 1 1',
    '1q6/8/8/8/8/2k5/8/K7 b - - 1 2',
    ]






    var movecounter = null;
   var  savedFen = null;




    
   function updateScore(){

    
   
    const dbRef = firebase.database();
    dbRef.ref('users/' + dauser.uid + '/score').get().then((snapshot) => {
      if (snapshot.exists()) {
        const x = snapshot.val();
        console.log(x)

        var y = document.getElementById("score") 
        y.innerText =''
        y.innerText += x
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  


  }





    
    
    function onDragStart (source, piece, position, orientation) {

        if(movecounter>0) return false;
  
      if(game.game_over()) return false
  
  
      if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
          (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
      }
    }
  
    function onDrop (source, target) {
      // see if the move is legal
      
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      }) 
    
      // illegal move
      if (move === null) return 'snapback'
      updateStatus()
      movecounter ++;
    }
  
    
    function onSnapEnd () {
      board.position(game.fen())
      //request AI move function
    }
  
  
    function updateStatus () {
      var status = ''
    
      var moveColor = 'White'
      if (game.turn() === 'b') {
        moveColor = 'Black'
      }
    
      // checkmate?
      if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.'

       
        if(dauser !== undefined){
          console.log(dauser)
        const dbRef = firebase.database();
        dbRef.ref('users/' + dauser.uid + '/score').get().then((snapshot) => {
          if (snapshot.exists()) {
            const x = snapshot.val() +1;
            writeUserScore(dauser.uid,x)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

        updateScore();
      }

      }
      else{
          status = "That's not checkmate, try again?"
      }
    
    
      $("#status").html(status)
  
    
    }


    function increasebyOne(x){
      return x+1;
    }
    

    var config = {
        draggable: true,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
      }

    var board = Chessboard('board1',config)
    var game = new Chess()
    setupNewPuzzle()

  

   
    

   function setupNewPuzzle(){
    movecounter = 0;

    var x = Math.floor(Math.random() * 6)
    
    
    
       board.position(inOnes[x],false)
        game.load(inOnes[x])
        savedFen = inOnes[x]

        var status = ''
        var moveColor = 'White'
        if (game.turn() === 'b') {
            moveColor = 'Black'
          }
        status = moveColor + ' to move'
        $("#status").html(status)
        


    }
  
  
 
      document.getElementById("yo").addEventListener("click", function() {
        setupNewPuzzle();
        
      });

      $("#tryAgain").on('click',function(){
        movecounter = 0;
        board.position(savedFen,false)
        game.load(savedFen)

        var status = ''
        var moveColor = 'White'
        if (game.turn() === 'b') {
            moveColor = 'Black'
          }
        status = moveColor + ' to move'
        $("#status").html(status)

      })


    
    }