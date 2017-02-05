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

var allTiles = [ tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8 ];


var turn = 0;
var currentTileNumber;
var userTiles = [];
var computerTiles = [];
var openTiles = [0,1,2,3,4,5,6,7,8];


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

/* 
when user plays:
- remove event handler
- add an 'x' to text value of div for tile
- add class on tile to 'played'
- update boardState. character in position matching tile number changes to 'u'
- add 1 to turn
- call computer's play function
	- TO DO: add timeout so there is 2 seconds before computer makes play
*/

function userHasPlayed(element){
	element.classList.add("played");
	element.innerHTML = "x";
	turn += 1;
	// console.log("user played ", turn);

	currentTileNumber = parseInt(element.id.slice(-1), 10);
	userTiles.push(currentTileNumber);
	openTiles[currentTileNumber] = null;
	console.log(userTiles);
	console.log(openTiles);

	computerWillPlay();
}


/* 
when computer plays:
- look at current boardState
- make decision on where to play
- make play, then:
	- remove event handler
	- add an 'o' to text value of div for tile
	- update class on tile to 'played'
	- update boardState. character in position matching tile number changes to 'c'
	- add 1 to turn
*/

function computerWillPlay(){
	tile3.removeEventListener("click", removeClickListener, false);
	tile3.classList.add("played");
	tile3.innerHTML = "o";
	turn += 1;
	// console.log("computer played ", turn);

}



















