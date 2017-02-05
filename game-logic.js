// console.log("game-logic.js is loaded");

// EVENT LISTENERS 

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

function addEventListenerToTiles(index){
	return function(){
		console.log(allTiles[index]);
	};
}

for (var i = 0; i < allTiles.length; i++){
	// console.log(allTiles[i]);
	allTiles[i].onclick = addEventListenerToTiles(i);
}

// GAME LOGIC

var boardState = "ooooooooo";


















