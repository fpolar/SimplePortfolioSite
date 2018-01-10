//array of image src's and text colors
var imagePairs = [
	["lady.png", 7, 0],
	["water.png", 0, 0],
	["ben.png", 6, 5],
	["moon.png", 6, 5],
	["bird.png", 4, 3],
	["bean.png", 0, 0],
	["cliff.png", 6, 5],
	["sand-big.png", 6, 5],
];
var colorPairs = [
	//red 0
	["#d31316", "darkred"],
	//green 1
	["#36802d", "#234d20"],
	//light green 2
	["#88e88d", "#48a048"],
	//blue 3
	["#1537D7","darkblue"],
	//light blue 4
	["#8292dd","#273a93"],
	//grey 5
	["#adadad","#919191"],
	//white 6
	["#e5e5e5","#8c8c8c"],
	//bright red 7
	["#ea1014", "darkred"],
];
var longImageFlag = "";
var currLoc = 0;
var autoSlide = false;


//ensures that the bg is always correctly sized
$(document).ready(function(){
	resizeSplashBG();
	if($(window).width()>1000){
		longImageFlag = "long/";
	}
});
$(window).on('resize', function(){
	resizeSplashBG();
	if($(window).width()>1000){
		longImageFlag = "long/";
	}
	else{
		longImageFlag = "";
	}
});

//sets height for background images
function resizeSplashBG() {
	var splashHeight = $("#default-header").outerHeight();
	$("#splash-left").height(splashHeight);
	$("#splash-right").height(splashHeight);
	$("#splash-middle").height(splashHeight);
}

function nextSlide(x) {
	currLoc += x;
	if (currLoc >= imagePairs.length) {
		currLoc = 0;
	} else if (currLoc < 0) {
		currLoc = imagePairs.length-1;
	}
	changeColors(imagePairs[currLoc][1]);
	var splashingSide = "splash-left";
	var splashingOutside = "splash-right";
	if (x == 1) {
		splashingSide = "splash-right";
		splashingOutside = "splash-left";
	} 
	var splashingOut = $("#splash-middle"); //the current middle background div that needs to be moved
	var splashingIn = $("#"+splashingSide); // the side that will be rolling in
	$("#"+splashingOutside).remove(); // delete the side that will be replaced
	
	//setting the background image and changing its css id so it slides in 
	$(splashingIn).css("background-image", "url(assets/imgs/"+longImageFlag+imagePairs[currLoc][0]+")");
	$("#splash-middle").attr("id", splashingOutside)
	setTimeout(200);
	$(splashingIn).attr('id', 'splash-middle');
	
	//inserting new splash bg on either side and deleting old middle splash
	$("<div id='"+splashingSide+"'></div>").insertAfter("#splash-middle");
	
	resizeSplashBG();
}

function changeColors(x) {
	var links = $(".default-link");
	$.each(links, function(){
		if($(this).closest("div").attr('class') === "myName"){
			$(this).css("color", colorPairs[imagePairs[currLoc][1]][0]);
		}
		else{
			$(this).css("color", colorPairs[imagePairs[currLoc][2]][0]);
		}
	});
	
}

