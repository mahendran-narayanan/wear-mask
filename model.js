let video;
let poseNet;
let noseX=0;
let noseY=0;
let eyelX=0;
let eyelY=0;
let earrX=0;
let earrY=0;

function setup(){
	createCanvas(640,480);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video,modelReady);
	poseNet.on('pose',gotPoses);
	mask  = loadImage('mask.png');
}

function gotPoses(poses){
	if(poses.length>0){
		let nX = poses[0].pose.keypoints[0].position.x;
		let nY = poses[0].pose.keypoints[0].position.y;
		let eX = poses[0].pose.keypoints[4].position.x;
		let eY = poses[0].pose.keypoints[4].position.y;
		let erX = poses[0].pose.keypoints[3].position.x;
		let erY = poses[0].pose.keypoints[3].position.y;

		noseX = lerp(noseX,nX,0.5);
		noseY = lerp(noseY,nY,0.5);
		eyelX = lerp(eyelX,eX,0.5);
		eyelY = lerp(eyelY,eY,0.5);
		earrX = lerp(earrX,erX,0.5);
		earrY = lerp(earrY,erY,0.5);
	}
}

function modelReady(){
	console.log('model ready');
}

function draw(){
	image(video,0,0);
	let d = dist(noseX,noseY,eyelX,eyelY);
	let width = dist(earrX,earrY,eyelX,eyelY);
	text("WEAR MASK ALWAYS!...",10,30);
	text("Created by Mahendran",420,430);
	fill(255,0,0);
	width+=100;
	mask.resize(width,200);
	image(mask,eyelX,eyelY);
}
