﻿#pragma strict

//set in the scene
var changedObject:GameObject;//a platform or wall - //TODO:may be able to use just the transform
var moving: boolean = false;
var speed: float = 3;
var yDist: float = 0;
var xDist: float = 0;


var mainCamera:Camera;

//set in start()
var targetPosition: Vector3;
var step: float;
var startPosition: Vector3;


function Start(){

	mainCamera=Camera.main;

	startPosition = changedObject.transform.position;
	step = speed*Time.deltaTime;
	//Relative to current position, where would you like to move to
	targetPosition = startPosition + new Vector3(xDist, yDist, 0);
}
//when touch button - the wall is now moving
function OnTriggerEnter2D(hitInfo : Collider2D){
	if(hitInfo.collider2D.tag == "Player"){
		moving = true;
	}	
}

/* Phased out - now everything moves on fixedupdate
//as long as youre on the button move the wall
function OnTriggerStay2D(hitInfo: Collider2D){
	if(hitInfo.collider2D.tag =="Player"){
		var positionPrime:Vector3 = Vector3.MoveTowards(changedObject.transform.position, targetPosition, step);
		changedObject.transform.Translate(positionPrime - changedObject.transform.position);
//		changedObject.transform.position = Vector3.MoveTowards(changedObject.transform.position, targetPosition, step);
	}
}*/

//when off button no longer moving wall/moves back to position
function OnTriggerExit2D(hitInfo : Collider2D){
	if(hitInfo.collider2D.tag == "Player"){
		moving = false;
	}
}

function FixedUpdate(){
//if the player isnt on the button and the wall hasnt returned to its original position - move toward original position
	var positionPrime:Vector3;

	if(moving){
		positionPrime = Vector3.MoveTowards(changedObject.transform.position, targetPosition, step);
		changedObject.transform.Translate(positionPrime - changedObject.transform.position);
	}else{
		if(Vector3.Distance(startPosition, changedObject.transform.position) > .05){
			positionPrime = Vector3.MoveTowards(changedObject.transform.position, startPosition, step);
			changedObject.transform.Translate(positionPrime - changedObject.transform.position);
		}
	}

}

