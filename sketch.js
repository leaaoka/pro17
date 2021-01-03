var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkeyImage,monkeydied ;
var ground, groundImage;

var foodGroup, foodImage;
var obstaclesGroup, obstacleImage;

var score=0;

localStorage["HighestScore"] = 0;

function preload(){
  monkeyImage =         loadAnimation("monkey0.png","monkey1.png","monkey2.png",
                                      "monkey3.png","monkey4.png","monkey5.png","monkey6.png",
                                      "monkey7.png","monkey8.png");
  
  foodImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(50,340,20,50);
  
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.15;
  monkey.debug = false;
  monkey.setCollider("circle",0,0,270);
  
  ground = createSprite(300,380,1000,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Survival Time: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/50);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 299) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    foods();
    obstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    fill("red");
    textSize(50)
    text ("Game Over",200,200);
    
    ground.destroy();
    //set velcity of each game object to 0
    monkey.destroy();
    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function foods() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var food = createSprite(600,300,40,10);
    food.y = Math.round(random(240,260));
    food.addImage(foodImage);
    food.scale = 0.1;
    food.velocityX = -(3 + 3*score/100);
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
    //add each cloud to the group
    foodGroup.add(food);
    
    if(monkey.isTouching(food)) {
       food.destroy(); 
    }
    
  }
  
}

function obstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,355,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(3 + 3*score/100);
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}