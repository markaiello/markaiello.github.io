window.onload=function(){




  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var myobjy = document.getElementById("loginButton");
        myobjy.style.display = "none";

        var myobja = document.getElementById("signupbutton");
        myobja.style.display = "none";

        var data = document.createElement("p")
        data.innerText = 'User: ' + user.email

        var x =  document.getElementById("topbar")
        x.append(data);

    } else {
      var myobj4 = document.getElementById("logoutButton");
      myobj4.style.display = "none";
    }
  });


  $("#logoutButton").on('click',function(){
    firebase.auth().signOut().then(() => {
      window.location = 'index2.html'
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  })







    
    
    function onDragStart (source, piece, position, orientation) {
  
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
      board.flip()
      updateStatus()
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
      }
    
      // draw?
      else if (game.in_draw()) {
        status = 'Game over, drawn position'
      }
    
      // game still on
      else {
        status = moveColor + ' to move'
    
        // check?
        if (game.in_check()) {
          status += ', ' + moveColor + ' is in check'
        }
      }
      $("#status").html(status)
  
    
    }
  
  
  
    var config = {
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd
    }
  
      var board = Chessboard('board1',config)
      var game = new Chess()
     
    

    //   $('#yo').on('click',board.clear)
       
      document.getElementById("yo").addEventListener("click", function() {
        if(game.turn() === 'b') board.flip()
        game.reset()
        board.position('start')
        updateStatus()
        
      });
    }