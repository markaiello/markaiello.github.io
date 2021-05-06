# markaiello.github.io
Comp 426 Final Project:
  Mark Aiello
  
Achievements Completed:

1. Beginners Luck (20)
  - Incorporated into my "Position analyzer" tool
  - Take the current board position, converted to Forsyth–Edwards Notation (FEN), and make an http request to the LiChess api
  - Request returns popular moves played in that position, which are then displayed for the user to see
2. Now we’re cookin (20)
  - Incroporated into my landing page
  - Upon the page loading a request is made to the Chess.com api to retrieve the top daily player profiles
  - The names and ratings from these profiles is then displayed in a leaderboard on my landing page
3. rEnder it (30)
  - Incorporated throughout the site
  - Used ChessboardJS library to display a board and handle piece movement
  - Used Chess.js to handle detecting legal moves, as well as when checkmates or draws have been acheived
  
  - Using these libraries I implemented 3 mini-games:
  - Position analyzer: Will analyze any position as long as it occurs in the Lichess database and return a list of the most common moves played in high level           games
  - Play Against yourself: A mini game which flips the board orientation after each move is played and allows the user to play as both colors
  - Puzzles: Loads a random checkmate in one puzzle from a list, and loads it onto the board. The user is then allowed one move to achieve checkmate,
    if they can't they are alerted, and given an option to try that puzzle again, when a user is logged in, their lifetime # of puzzles solved will                      be stored in a firebase database, and displayed on the screen
             



4. There’s something about Firebase (15)
  - Implemented user signup and login using firebase
  - Once logged in a user can keep track of their puzzle score

5. Autocomp (10)
  - implemented predictive autocompletion on the email entry section of login and signup pages
  - e.g. when "@g" is typed, "@gmail.com" will appear in the field, and a user can then press tab or enter to accepr the autocompletion

Total Unlocked: 95 points


          
