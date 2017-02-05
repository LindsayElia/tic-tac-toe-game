// console.log("game-logic.js is loaded");

var tile0 = document.getElementById("tile0"),
	tile1 = document.getElementById("tile1"),
	tile2 = document.getElementById("tile2"),
	tile3 = document.getElementById("tile3"),
	tile4 = document.getElementById("tile4"),
	tile5 = document.getElementById("tile5"),
	tile6 = document.getElementById("tile6"),
	tile7 = document.getElementById("tile7"),
	tile8 = document.getElementById("tile8");

var allTiles = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8];


var turn = 0;
var currentTileNumber;
var userTiles = [];
var computerTiles = [];
var openTiles = [0,1,2,3,4,5,6,7,8];
var decision;


// EVENT LISTENERS 

for (var i = 0; i < allTiles.length; i++){
	allTiles[i].addEventListener("click", removeClickListener, false);
}

function removeClickListener(){
	// console.log(this);
	this.removeEventListener("click", removeClickListener, false);
	
	// when user plays, turns should be even
	if (turn%2 === 0){
		userHasPlayed(this);
	}
}



// GAME LOGIC
// PLEASE NOTE - currently the game only 'works' if the user plays
// in an edge/middle square, such as tile1 or tile3,
// and then plays one of the corner squares s next to that,
// and then plays the edge/middle square on the other side of that corner square

/* 
when user plays:
- remove event handler
- add an 'x' to text value of div for tile
- add class on tile to 'played'
- update board state, userTiles and openTiles
- add 1 to turn
- call computer's play function
	- TO DO: add timeout so there is 2 seconds before computer makes play
*/

function userHasPlayed(element){
	element.classList.add("played");
	element.innerHTML = "u";
	turn += 1;
	// console.log("user played ", turn);

	currentTileNumber = parseInt(element.id.slice(-1), 10);
	userTiles.push(currentTileNumber);
	openTiles[currentTileNumber] = null;
	console.log("userTiles: ", userTiles);
	// console.log("openTiles: ", openTiles);

	computerWillPlay();
}


/* 
when computer plays:
- look at current board state
- make decision on where to play
- make play, then:
	- remove event handler
	- add an 'o' to text value of div for tile
	- update class on tile to 'played'
	- update boardState, computertiles and openTiles
	- add 1 to turn
*/

function computerWillPlay(){
	console.log("turn count before computer plays:", turn);
	var computerNeedsToPlay = true;	// TO DO - clean up logic. I'm using this sometimes but not always.

	// DECIDE WHAT TILE TO PLAY ON

	// first play by computer, only two choices
	if (turn === 1){
		// if user went in center, computer goes in lower left corner
		// TO DO - randomize where computer goes to make game more realistic
		if (userTiles[0] === 4){
			decision = tile6;
		} else {
			// if user went anywhere except center, computer goes in center
			decision = tile4;
		}
	}

	// block user if user is about to win
		// TO DO - add more of these for when user goes in center
			// these options are only for when computer goes in center first
		// TO DO - more efficient way to check if user has played two 
			// out of any three squares that make a win
			// and to go in third square to block
	if (turn > 2 && computerNeedsToPlay){
		// openTiles[2] !== null is to not mark this tile if it has already been marked
		if ( (openTiles[2] !== null && userTiles[0] === 0 && userTiles[1] === 1) ||
			 (openTiles[2] !== null && userTiles[0] === 1 && userTiles[1] === 0) ||
			 (openTiles[2] !== null && userTiles[0] === 5 && userTiles[1] === 8) ||
			 (openTiles[2] !== null && userTiles[0] === 8 && userTiles[1] === 5) ){
				decision = tile2;
		}
		if ( (openTiles[0] !== null && userTiles[0] === 1 && userTiles[1] === 2) ||
			 (openTiles[0] !== null && userTiles[0] === 2 && userTiles[1] === 1) ||
			 (openTiles[0] !== null && userTiles[0] === 6 && userTiles[1] === 3) ||
			 (openTiles[0] !== null && userTiles[0] === 3 && userTiles[1] === 6) ){
				decision = tile0;
		}
		if ( (openTiles[6] !== null && userTiles[0] === 0 && userTiles[1] === 3) ||
			 (openTiles[6] !== null && userTiles[0] === 3 && userTiles[1] === 0) ||
			 (openTiles[6] !== null && userTiles[0] === 7 && userTiles[1] === 8) ||
			 (openTiles[6] !== null && userTiles[0] === 8 && userTiles[1] === 7) ){
				decision = tile6;
		}
		if ( (openTiles[8] !== null && userTiles[0] === 2 && userTiles[1] === 5) ||
			 (openTiles[8] !== null && userTiles[0] === 5 && userTiles[1] === 2) ||
			 (openTiles[8] !== null && userTiles[0] === 6 && userTiles[1] === 7) ||
			 (openTiles[8] !== null && userTiles[0] === 7 && userTiles[1] === 6) ){
				decision = tile8;
		}
		if ( (openTiles[1] !== null && userTiles[0] === 0 && userTiles[1] === 2) ||
			 (openTiles[1] !== null && userTiles[0] === 2 && userTiles[1] === 0) ){
				decision = tile1;
		}
		if ( (openTiles[3] !== null && userTiles[0] === 0 && userTiles[1] === 6) ||
			 (openTiles[3] !== null && userTiles[0] === 6 && userTiles[1] === 0) ){
				decision = tile3;
		}
		if ( (openTiles[5] !== null && userTiles[0] === 2 && userTiles[1] === 8) ||
			 (openTiles[5] !== null && userTiles[0] === 8 && userTiles[1] === 2) ){
				decision = tile5;
		}
		if ( (openTiles[7] !== null && userTiles[0] === 6 && userTiles[1] === 8) ||
			 (openTiles[7] !== null && userTiles[0] === 8 && userTiles[1] === 6) ){
				decision = tile7;
		}

		computerNeedsToPlay = false;
	}


	// second play by computer
	// TO DO - logic for this and previous set of ruls is conflicting, this does not get run
	if (turn === 3 && computerNeedsToPlay){
		// if computer went in center
		if (computerTiles[0] === 4){
			// and user has played opposite corners
			if ( (userTiles[0] === 0 && userTiles[1] === 8 ) || 
				 (userTiles[0] === 8 && userTiles[1] === 0 ) ||
				 (userTiles[0] === 2 && userTiles[1] === 6 ) ||
				 (userTiles[0] === 6 && userTiles[1] === 2 ) 
				 ){
					// computer can go in any middle/edge, so let's choose top center
					// TO DO - choose middle/edge adjacent to where user just played
					 decision = tile1;
			}
			// and user has gone in a spot adjacent to the opposite corner from their first move
			// (other middle/edge cases should be caught by previous logic for user having two in a row)
			else {
				// computer should go in the 'other' edge adjacent to expected opposite corner
				if ( (userTiles[0] === 0 && userTiles[1] === 5) ||
					 (userTiles[0] === 2 && userTiles[1] === 3) ){
						decision = tile7;
				}
				else if ( (userTiles[0] === 0 && userTiles[1] === 7) ||
					 (userTiles[0] === 6 && userTiles[1] === 1) ){
						decision = tile5;
				}
				else if ( (userTiles[0] === 2 && userTiles[1] === 7) ||
					 (userTiles[0] === 8 && userTiles[1] === 1)) {
						decision = tile3;
				}
				else {
				// if ( (userTiles[0] === 6 && userTiles[1] === 5) ||
					 // (userTiles[0] === 8 && userTiles[1] === 3) ){
						decision = tile1;
				}				
			}

		} 
		// if computer went in lower left corner
		// else { 
			// TO DO - add logic for if user went in center on first turn
		// }

	}

	// TO DO - look to see if computer has two in a row with the option to win
	if (turn > 4){
		if (computerTiles[0] === 4 && computerTiles[1] === 0){
			decision = tile8;
		}
		if (computerTiles[0] === 4 && computerTiles[1] === 2){
			decision = tile6;
		}
		if (computerTiles[0] === 4 && computerTiles[1] === 8){
			decision = tile0;
		}
		if (computerTiles[0] === 4 && computerTiles[1] === 6){
			decision = tile2;
		}

	}



	// ONCE DECISION HAS BEEN MADE,
	// MAKE CHANGES TO BOARD
	decision.removeEventListener("click", removeClickListener, false);
	decision.classList.add("played");
	decision.innerHTML = "c";

	currentTileNumber = parseInt(decision.id.slice(-1), 10);
	computerTiles.push(currentTileNumber);
	openTiles[currentTileNumber] = null;
	console.log("computerTiles: ", computerTiles);
	console.log("openTiles: ", openTiles);

	// last thing computer does is update turn play
	turn += 1;
	console.log("turn count after computer plays:", turn);
}



// TO DO - once logic is working,
// update symbols to 'x' and 'o' instead of 'u' and 'c'




/* --------------------------------------------------------------
ALTERNATE GAME LOGIC

Set tiles up so they have properties for beig open/closed and a weighting, like so:

tile1 = {
	open: true,
	weight: 0
}

The first decision is always for the computer to play in the center or a corner.

For all decisions after that:
- reset weights on tiles to all be zero
- give a ranking to all tiles based on what turn in the game it is
	- tiles that lead to a win get a 1
	- tiles that are neutral get a zero
	- tiles that lead to a lose get a -1

If tile is open and weight is 1, make that tile the decision tile.

Update board to reflect decision.



There is likely a way to make this decision for weighting recursivley.
The way I am describing it here (lines 258 to 263), I would not need to 
give weights of zero and -1 because I would not end up evaluating those,
I only am checking for a weight of 1.

A potential drawback for a recursive solution, if it checks all possiblities
for each round, is that it could have a slower run time / doing more work than needed.

*/

