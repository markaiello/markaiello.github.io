
window.onload=function(){
  var myobj = document.getElementById("evaluatePosition");
  myobj.style.display = "none";

  var myobj2 = document.getElementById("evaltable");
  myobj2.style.display = "none";

  

  function onDragStart (source, piece, position, orientation) {

    if(game.game_over()) return false


    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  function onDrop (source, target) {
    // see if the move is legal
    
    console.log(source)
    console.log(target)
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    }) 
  
    // illegal move
    if (move === null) return 'snapback'
    updateStatus()
    console.log(game.fen())
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

  
  }



  var config = {
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }

    var board = Chessboard('board1',config)
    var game = new Chess()
   

      $('#chooseWhite').on('click', function(){
        var playerisWhite = true;
        board.position('start')
          updateStatus();
          removeNewGameButton();
          removeEvaluateButton();
          removeEvaluateTable()

      })

     
      $('#chooseBlack').on('click', function(){
        var playerisWhite = false;
        board.position('start')
        board.orientation('black')
          updateStatus();
          removeNewGameButton();
          removeEvaluateButton();
          removeEvaluateTable()

      })




      document.querySelectorAll('.modal-button').forEach(function(el) {
        el.addEventListener('click', function() {
          var target = document.querySelector(el.getAttribute('data-target'));
          
          target.classList.add('is-active');
          
         

          target.querySelector('#chooseWhite').addEventListener('click',   function() {
              target.classList.remove('is-active');
           });
           target.querySelector('#chooseBlack').addEventListener('click',   function() {
            target.classList.remove('is-active');
         });
        });
      });

      


      function removeEvaluateButton(){
        var myobj = document.getElementById("evaluatePosition");
        if (myobj.style.display === "none") {
          myobj.style.display = "block";
        } else {
          myobj.style.display = "none";
        }
      }

      function removeEvaluateTable(){
        var myobj = document.getElementById("evaltable");
        if (myobj.style.display === "none") {
          myobj.style.display = "block";
        } else {
          myobj.style.display = "none";
        }
      }
      


      function removeNewGameButton(){
        var myobj = document.getElementById("newGameButton");
        if (myobj.style.display === "none") {
          myobj.style.display = "block";
        } else {
          myobj.style.display = "none";
        }
      }




      $("#evaluatePosition").on('click', async function(){
        var fen = parse(game.fen())
        const result = await axios({
          method: 'get',
          url: 'https://lichess.org/api/cloud-eval',
          params:{
            "fen": fen 
          }
        });

        var a = result.data.pvs[0].moves

        var x =  document.getElementById("EngineEntry")
        x.innerHTML = ''


        addMovestoList(a)

        
      })


      function parse(s){
        var s = Array.from(s);
        var a = s.length-5
        
        if(s[a] != '-'){
          s.splice(a-1,2,'-')
        }

        return s.join('');
      }

    
      function addMovestoList(a){
      
      var stringArray = a.trim().split(/\s+/);
      
      for(var i=0;i<stringArray.length;i++){
        const myParent = document.createElement("tr")
        var data = document.createElement("th")
        data.innerText = stringArray[i];

        var x =  document.getElementById("EngineEntry")
        x.append(myParent);
        myParent.append(data)
      }



      }

     


  }


