
var balloon;
var balloonPosition;

function preload(){
now=loadImage("h.png");
balloon1=loadAnimation("hm.png","hmm.png","hmmm.png");
balloon2=loadAnimation("hmm.png");



}

function setup() {
  createCanvas(500,500);
  balloon=createSprite(250, 400,20,20);
  balloon.addAnimation("balloon",balloon2)
  balloon.scale=0.3

 database=firebase.database()
 balloonPosition=database.ref('balloon/position');
 balloonPosition.on("value",readPosition,showError);

 
  
}

function draw() {
  background(now);  
  drawSprites();

  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10
    updateHeight(+10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10
    updateHeight(0,-10);
    balloon.changeAnimation("balloon1",balloon1);
    
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10
    updateHeight(0,+10);
  }
  
}
function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x':balloon.x+x,
    'y':balloon.y+y
  })
}
function readPosition(data){
  var heightt=data.val();
   balloon.x=heightt.x;
  balloon.y=heightt.y;
}
function showError(){
  console.log("Error in writing to the database")
}
