//array of image src's and text colors
var imagePairs = [
	["water.png", 0],
	["trees.png", 0],
	["sand.png", 0],
	["sand-big.png", 0],
	["moon.png", 0],
	["lady.png", 0],
	["flower.png", 0],
	["cliff.png", 0],
	["bird.png", 0],
	["ben.png", 0],
	["bean.png", 0],
	["aquarium.png", 0]
];
var colorPairs = [
	["red", "blue"],
	["green","purple"],
	["grey","grey"]
];
var currLoc = 0;
var autoSlide = false;


//ensures that the bg is always correctly sized
$(document).ready(function(){
	resizeSplashBG();
//	setInterval(function(){
//		autoSlide = true;
//	}, 3500);
//	setInterval(function(){
//		if(autoSlide){
//			nextSlide(1);
//		}
//	}, 3500);
});
$(window).on('resize', resizeSplashBG);

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
	$(splashingIn).css("background-image", "url(assets/imgs/"+imagePairs[currLoc][0]+")");
	$("#splash-middle").attr("id", splashingOutside)
	setTimeout(200);
	$(splashingIn).attr('id', 'splash-middle');
	
	//inserting new splash bg on either side and deleting old middle splash
	$("<div id='"+splashingSide+"'></div>").insertAfter("#splash-middle");
	
	resizeSplashBG();
}

function changeColors(x) {
	var links = $(".default-link");
	links.removeClass("default-link");
	$.each(links, function(){
		if($(this).closest("div").attr('class') === "myName"){
			$(this).addClass(colorPairs[imagePairs[currLoc][1]][0]+"-link");
		}
		else{
			$(this).addClass(colorPairs[imagePairs[currLoc][1]][1]+"-link");
		}
	});
}

