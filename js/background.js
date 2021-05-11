chrome.alarms.create('update', {periodInMinutes: 60 * 8});

chrome.runtime.onInstalled.addListener(function() {
	init();
});

chrome.runtime.onStartup.addListener(function() {
	init();
});

chrome.alarms.onAlarm.addListener(function(alarm) {
	init();
});

var init = function() {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 19;
	canvas.height = 19;
	
	moment.locale('sv');

	var background = new Image();
// Tillagt:
	const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	if(userPrefersDark){
		background.src = "/images/calendar4.png";
	}
	else background.src = "/images/calendar3.png";

	background.onload = function() {
		updateIcon(ctx, canvas, background, userPrefersDark);
	}
}

var updateIcon = function(ctx, canvas, background, userPrefersDark) {
	drawBackground(ctx, background);

	var week = moment().format('w');
	drawText(ctx, week, userPrefersDark);

	chrome.browserAction.setIcon({
		"imageData": ctx.getImageData(0, 0, canvas.width, canvas.height)
	});
}

var drawBackground = function(ctx, background) {
	ctx.drawImage(background, 0, 0);
}

var drawText = function(ctx, text, userPrefersDark) {
	var xOffset;
//Tillagt:
	if(userPrefersDark){
    	ctx.fillStyle = 'rgba(255, 255, 255, 255)';
	}
	else ctx.fillStyle = 'rgba(0, 0, 0, 255)';
	ctx.font = "bold 10px Arial";

	if (text.length > 1) {
		xOffset = 4;
	} else {
		xOffset = 7;
	}
	
	ctx.fillText(text, xOffset, 15, 19);
}
