var backImage, player, ground, pointGroup, obstacleGroup, score
var gameState = 1;
var END = 0;
var PLAY = 1;

function preload(){
  backImage = loadImage("images/monkeyImage.jpg")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  player = createSprite(displayWidth/4,260,20,50);

  ground = createSprite (displayWidth/2,390,displayWidth,10);
  ground.visible = true;
  ground.velocityX = -4;

  score = 0;

  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(backImage);
  text ("score" +  score,50,50) 
  if(ground.x < 0){
    ground.x = 200;
   }if (gameState === PLAY){
    if (keyDown("space") && player.y >= 230){
    player.velocityY = -9;
  }
  player.velocityY = player.velocityY+ 0.4;
 
  food();
    if (pointGroup.isTouching(player)){
   pointGroup.destroyEach();
    score = score+1;
  }
  obstacles();
    if (obstacleGroup.isTouching(player)){
  gameState = END;
  pointGroup.destroyEach();
 obstacleGroup.destroyEach(); 
  }
  }else if (gameState === END){
    ground.velocityX = 0;
    ground.X = displayWidth/2;
    player.visible = false;
    text ("gameover",200,200);
    text ("press space to restart",200,240);
    if (keyDown("space")){
      player.visible = true;
      ground.velocityX = -4;
      reset();
    }
  }
  player.collide(ground);
  drawSprites();
}
function reset(){
  gameState = PLAY;
  score = 0;
}
function food(){
  if (frameCount % 80 === 0){
    point = createSprite(400,200,20,20);
    point.scale = 0.05;
    point.y = Math.round(random(110,190));
    point.lifetime = 50;
    point.velocityX = -7;
    pointGroup.add(point);
  }
}
function obstacles(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(400,200,20,20);
    obstacle.scale = 0.25;
    obstacle.y = 360;
    obstacle.lifetime = 70;
    obstacle.velocityX = -7;
    obstacleGroup.add(obstacle);
  }
}