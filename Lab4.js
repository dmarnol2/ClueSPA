/** 
David Arnold
Ser 421 Fall B 2017
Game modeled after the boardgame CLUE
Lab4
**/

var suspects = ["Professor Plum", "Miss Scarlet", "Mrs White", "Mrs Peacock", "Colonel Mustard", "Mr Green"];
var weapons = ["Revolver", "Knife", "Rope", "Leadpipe", "Candlestick", "Wrench"];
var rooms = ["Kitchen", "Ball Room", "Conservatory", "Dining Room", "Billiard Room", "Library", "Study", "Hall", "Lounge"];
var suspects2=suspects;
var weapons2=weapons;
var rooms2=rooms;
var secretCards=[];
var playerCards=[];
var computerCards=[]; 
var compSuspChoice=[];
var compWeapChoice=[];
var compRoomChoice=[];
var computerChoices=[]; 
var suspDropdown=[];
var weapDropdown=[];
var roomDropdown=[];
var badCompGuess=[];
var gameHistory=[];
var gameRecord=[];
var computerGuess=[];
var forHints=[];
var playerTurn=false;
var wrong;
var playerScore=0;
var computerScore=0;
var computerLoss=0;
var playerGuess=[];
var sAns, wAns, rAns, sGuess, wGuess, rGuess, name;
var g=1;

// for game conditions to be implemented
var continueGame="yes";
var winner="no";

function init(){
	document.getElementById("gamePieces").innerHTML="The Suspects: "+suspects.join(", ")+"<br><br>"+
		"The Weapons: "+weapons.join(", ")+"<br><br>"+
		"The Rooms: "+rooms.join(", ")+"<br>";
	var elem = document.getElementById("button1");
	if(localStorage.getItem("pName")!=""){
		
		document.getElementById("showRecord").style.display="inline";
    	document.getElementById("showHistory").style.display="inline";
    	document.getElementById("player").innerHTML="Welcome "+localStorage.getItem("pName");
    	document.getElementById("box").style.display="none";
    	document.getElementById("directions").style.display="inline";
    	document.getElementById("dropdown").style.display="inline";
    	document.getElementById("header").style.display="inline";
    	elem.value = "Log Out";
    	secret3();
    }

	else{
		
		localStorage.setItem("date",Date());
		localStorage.setItem("wins", computerScore);
		localStorage.setItem("losses", computerLoss);
	}

}
function computerTurn () {	
	playerTurn=true;
	sGuess = compSuspChoice[(Math.random()*(compSuspChoice.length-1)).toFixed()];
	wGuess = compWeapChoice[(Math.random()*(compWeapChoice.length-1)).toFixed()];
	rGuess = compRoomChoice[(Math.random()*(compRoomChoice.length-1)).toFixed()];
	computerGuess.push("Computer guess: ",sGuess,wGuess,rGuess);
	createHistory(computerGuess,"c");
	computerGuess=[];
	if (sGuess==sAns&&wGuess==wAns&&rGuess==rAns){  //COMPUTER WINS
		document.getElementById("all").innerHTML="Computer Wins! It was "+sGuess+" in the "+
		rGuess+" with the "+wGuess+".";
		computerScore++;
		winner="yes";
		continueButton.value="Submit";
		localStorage.setItem("wins", computerScore);
	}
	else {
		if(sGuess!=sAns)
			badCompGuess.push(sGuess);
		if(wGuess!=wAns)
			badCompGuess.push(wGuess);
		if(rGuess!=rAns)
			badCompGuess.push(rGuess);
		var temp=badCompGuess;
		badCompGuess=[];
		var wrongChoice=temp[(Math.random()*(temp.length-1)).toFixed()];
		document.getElementById("all").innerHTML="The computer did not choose correctly. "+
		 	"Computer's guess: "+sGuess+", "+wGuess+", "+rGuess;
		 	
		 	removeCard(wrongChoice,compSuspChoice);
			removeCard(wrongChoice,compWeapChoice);
			removeCard(wrongChoice,compRoomChoice);
		 }
		continueButton = document.getElementById("guessButton");
		continueButton.value="Continue";
	}

function checkGuess(){  
	document.getElementById("guess").style.display="visible";
	continueButton = document.getElementById("guessButton");

	if(continueButton.value=="Continue"){
		document.getElementById("guess").style.display="none";
		document.getElementById("all").style.display="none";
		if(winner=="yes"){
			location.reload();
		}
		else{
			if (playerTurn==true){
				document.getElementById("all").style.display="none";
				document.getElementById("sChoice").style.display="inline";
				document.getElementById("wChoice").style.display="inline";
				document.getElementById("rChoice").style.display="inline";
    			document.getElementById("directions").style.display="inline";
    			document.getElementById("header").style.display="inline";
				continueButton.value="Submit";
				playerTurn=false;
			}
			else{
				document.getElementById("all").style.display="inline";
				computerTurn();
			}
		}
	}
	else{
		document.getElementById("guess").style.display="inline";
		document.getElementById("sChoice").style.display="none";
		document.getElementById("wChoice").style.display="none";
		document.getElementById("rChoice").style.display="none";
    	document.getElementById("directions").style.display="none";
    	document.getElementById("header").style.display="none";
    	var sGuess=document.getElementById("sChoice");
		var wGuess=document.getElementById("wChoice");
		var rGuess=document.getElementById("rChoice");
		var s = sGuess.options[sGuess.selectedIndex].text;
		var w = wGuess.options[wGuess.selectedIndex].text;
		var r = rGuess.options[rGuess.selectedIndex].text;
		playerGuess.push("Your guess: ",s,w,r);
		createHistory(playerGuess);
		playerGuess=[];
		if (s==sAns&&w==wAns&&r==rAns){
		playerScore++;
		computerLoss++;
		localStorage.setItem("losses", computerLoss);
		document.getElementById("guess").innerHTML="You Win!! and have won "+playerScore+ " games";
		winner="yes";
		continueButton.value="Continue";
		reset();
		}
		else{
		// this is to allow displayHint() to pick random card to show player
			continueButton.value="Continue";
			if(s!=sAns)
				forHints.push(s);
			if(w!=wAns)
				forHints.push(w);
			if(r!=rAns)
				forHints.push(r);
			var temp=forHints;
			displayHint(temp);
			}
		}
	}

function change(){
	var elem = document.getElementById("button1");
    playerName = document.getElementById("box").value;
    localStorage.setItem("pName", playerName);
    if (elem.value=="Log In") {
    	document.getElementById("showRecord").style.display="inline";
    	document.getElementById("showHistory").style.display="inline";
    	document.getElementById("player").innerHTML="Welcome "+localStorage.getItem("pName");
    	document.getElementById("box").style.display="none";
    	document.getElementById("directions").style.display="inline";
    	document.getElementById("dropdown").style.display="inline";
    	document.getElementById("header").style.display="inline";
    	elem.value = "Log Out";
    	secret3();
    }
    else {
    	localStorage.setItem("pName", "");
    	location.reload();
    	elem.value = "Log In";
    	document.getElementById("showRecord").style.display="none";
    	document.getElementById("showHistory").style.display="none";
    	document.getElementById("box").style.display="inline";
    	document.getElementById("dropdown").style.display="none";
    	document.getElementById("directions").style.display="none";
    	document.getElementById("header").style.display="none";
    	document.getElementById("player").innerHTML="Please enter your name";
    }
}

function createHistory(cards){
	gameHistory.push(g, cards.join(" "));
	g++;
}


function showHistory(){
	if(document.getElementById("showHistory").value=="Show History"){
	document.getElementById("showHistory").value="Hide History";
	document.getElementById("history").style.display="inline";
	document.getElementById("history").innerHTML=gameHistory.join("<br> ");
}
	else{
		document.getElementById("showHistory").value="Show History";
		document.getElementById("history").style.display="none";
	}
	
}
function showRecord(){
	if(document.getElementById("showRecord").value=="Show Record"){
	document.getElementById("showRecord").value="Hide Record";
	document.getElementById("record").style.display="inline";
	document.getElementById("record1").style.display="inline";
	document.getElementById("wins").style.display="inline";
	document.getElementById("losses").style.display="inline";
	document.getElementById("date").style.display="inline";
	document.getElementById("wins").innerHTML="Computer Wins:   "+localStorage.getItem("wins");
	document.getElementById("losses").innerHTML="Computer Losses: "+localStorage.getItem("losses");
	document.getElementById("record1").innerHTML="The computer has played: "+localStorage.getItem("pName");
	document.getElementById("date").innerHTML="Date:  "+localStorage.getItem("date");
}
	else{
		document.getElementById("showRecord").value="Show Record";
		document.getElementById("record").style.display="none";
		document.getElementById("record1").style.display="none";
		document.getElementById("wins").style.display="none";
		document.getElementById("losses").style.display="none";
		document.getElementById("date").style.display="none";
	}
	
}

// randomly deals card to player and computer. param is all cards minus secret cards
// called from secret3()
function shuffle(cards){
	
	var numCards=cards.length/2;
	var i;
	var newCard;
	for (i=1;i<=numCards;i++){
		newCard=cards[(Math.random()*(cards.length-1)).toFixed()];
		playerCards.push(newCard);
		computerChoices.push(newCard);
		addToComputerChoice(newCard,suspects2); 
		addToComputerChoice(newCard,weapons2);
		addToComputerChoice(newCard,rooms2);
		removeCard(newCard,cards);
		removeCard(newCard,suspects2); 
		removeCard(newCard,weapons2);
		removeCard(newCard,rooms2);
		}
	
	dropdown=computerCards+secretCards;

	// player choices
	suspects2.push(sAns);  
	weapons2.push(wAns);
	rooms2.push(rAns);

	dropdownSusp(suspects2); 
	dropdownWeap(weapons2);
	dropdownRoom(rooms2);
	document.getElementById("playerHand").innerHTML="Here are you game cards: "+playerCards.join(", ");
}

function dropdownSusp(category) {
	var x = category;
    var y = document.getElementById("sChoice");
    for(i=0;i<x.length;i++){
    var option = document.createElement("option");
    option.text = x[i];
    y.add(option);}
}
function dropdownWeap(category) {
	var x = category;
    var y = document.getElementById("wChoice");
    for(i=0;i<x.length;i++){
    var option = document.createElement("option");
    option.text = x[i];
    y.add(option);}
}
function dropdownRoom(category) {
	var x = category;
    var y = document.getElementById("rChoice");
    for(i=0;i<x.length;i++){
    var option = document.createElement("option");
    option.text = x[i];
    y.add(option);}
}

function secret3(){
	sAns = suspects2[(Math.random()*(suspects2.length-1)).toFixed()];
	wAns = weapons2[(Math.random()*(weapons2.length-1)).toFixed()];
	rAns = rooms2[(Math.random()*(rooms2.length-1)).toFixed()];
	secretCards.push(sAns, wAns, rAns);
	addToComputerChoice(sAns,suspects2); 
	addToComputerChoice(wAns,weapons2);
	addToComputerChoice(rAns,rooms2);
	removeCard(sAns,suspects2);   
	removeCard(wAns,weapons2);
	removeCard(rAns,rooms2);
	var allCards=suspects2.concat(weapons2,rooms2);  
	shuffle(allCards);
}


// removes card from array supplied arrays
function removeCard(card, group){
	var i = group.indexOf(card);
		if(i != -1) {
			group.splice(i, 1);
		}
	}

// cards computer is to guess			
function addToComputerChoice(card,group){
	var i = group.indexOf(card);
		if(i != -1) {
			if (group==suspects2)  
			compSuspChoice.push(card);
			else if(group==weapons2)
			compWeapChoice.push(card);
			else
			compRoomChoice.push(card);
			}
		}

//remove card from dropdown menu upon showing to player
function updateDropdown(card,group){
	var remv;
	var i = group.indexOf(card);
		if(i != -1) {
			if (group==suspects2){  
			remv = document.getElementById("sChoice");
    		remv.remove(remv.selectedIndex);}
			else if(group==weapons2){
			remv = document.getElementById("wChoice");
    		remv.remove(remv.selectedIndex);}
			else{
			remv = document.getElementById("rChoice");
    		remv.remove(remv.selectedIndex);}
			}
		}


function displayHint(plGuess){
		
		wrong = plGuess[(Math.random()*(plGuess.length-1)).toFixed()];
		
		if (plGuess.indexOf(wrong!=-1)){
			document.getElementById("guess").innerHTML="Your guess did not match the secret. "+ 
			"Here is a hint: "+wrong+" is not a correct guess.";
			
			updateDropdown(wrong,suspects2); 
			updateDropdown(wrong,weapons2);
			updateDropdown(wrong,rooms2);
			}
		else{ 
			displayHint(plGuess);  
	}
}
