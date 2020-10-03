var Play=1;
var End=0;
var gamestate=Play;

var score=0;
var coins=0;

var coin,coinimg;
var coinGroup;
var ground,bg;
var player;
var lefttrainGroup;
var borderl,borderr;
var trainleft;
var done = [50, 150, 250]
var rb,restart;

function preload(){
  ground1=loadImage("Three_rail_tracks_350.jpg");
  rb=loadImage("rb.png");
  coinimg=loadImage("coin.png");
}

function setup() {
  createCanvas(300,500);

  player=createSprite(150,450,100,100);
  player.shapeColor=color("red");


  lefttrainGroup=new Group();
  coinGroup=new Group();

  borderr=createSprite(300,350,5,700);
  borderr.shapeColor=color("blue");

  borderl=createSprite(0,350,5,700);
  borderl.shapeColor=color("blue");


  restart=createSprite(150,250);
  restart.addImage(rb);
  rb.resize(width/2,height/5)

  restart.visible=false;
}

function draw() {
  background(ground1); 
  
   
  if(gamestate===Play){

  
    score = score +1
    fill("yellow")
    textSize(25)
    text("Score: "+ score , 150,50)
  
   if(coinGroup.collide(player)){
    coin.visible=false;
    coins = coins +10
   }

   fill("yellow");
   textSize(25)
   text("Coins: "+ coins , 150,70)
    

    if (keyWentDown(LEFT_ARROW)){
      player.x=player.x - 100;
    }
  
    if (keyWentDown(RIGHT_ARROW)){
      player.x=player.x + 100;
    }

  spawncoins();
  spawnLtrain();


 if(lefttrainGroup.collide(player)){
   gamestate=End;
 }
}
else if(gamestate=== End){
  restart.visible=true;
    fill("yellow");
    textSize(35);
    text("Game Over",70,120);
    text("Score:"+score,80,150)
    text("Coins:"+coins,80,190)
  trainleft.velocityY=0
  coin.velocityY=0

  lefttrainGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
}

if(mousePressedOver(restart)){
  reset();
}

  drawSprites();
}


function spawnLtrain(){
  if(frameCount % 50 === 0){
    trainleft=createSprite(50,50,100,100);
    trainleft.x=random(done);
    trainleft.shapeColor=color("black");
    trainleft.velocityY=15;

    trainleft.lifetime=34;

   lefttrainGroup.add(trainleft);
  }
}

function spawncoins(){
    if(frameCount % 20 === 0){
      coin=createSprite(50,50,20,20);
      coin.addImage(coinimg);
      coinimg.resize(width/10,height/10)
      coin.x=random(done);
      coin.shapeColor=color("yellow");
      coin.velocityY=5;
  
      coin.visible=true
      coin.lifetime=100;
  
     coinGroup.add(coin);
    }
}


 function reset(){
   gamestate = Play;
   restart.visible=false;
   lefttrainGroup.destroyEach();
   coinGroup.destroyEach();
   score=0;
   coins=0;
 }





