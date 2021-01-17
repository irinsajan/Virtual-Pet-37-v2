var database;
var foodS, dog;
var dogImage, happyDogImage, bedroomImage, gardenImage, washroomImage;

var feedButton, addFoodButton;

var feedTime, currentTime;
var foodObj;

var game;

var gameState = null;

function preload(){
  dogImage = loadImage("images/dog.png");
  happyDogImage = loadImage("images/happyDog.png");
  bedroomImage = loadImage("images/Bed Room.png");
  gardenImage = loadImage("images/Garden.png");
  washroomImage = loadImage("images/Wash Room.png");
}
	


function setup() {
  createCanvas(400,500);

  database = firebase.database();
  game = new Game();
  
  
  dog = createSprite(width/2,height-100);
  dog.scale = 0.2;

  feedButton = createButton("Feed the dog");
  feedButton.position(width/2-50,80);

  addFoodButton = createButton("Add food to the stock");
  addFoodButton.position(width/2+50,80);

  foodObj = new Food();

  var feedTimeRef = database.ref('lastFed');
  feedTimeRef.on("value",function(data){
    feedTime = data.val();
  });

  

 
}


function draw() {  
  background(46,139,87);
  foodObj.getFoodStock();

  game.readState();
  currentTime = hour();
  if (currentTime===(feedTime+1)){
    foodObj.garden();
    game.update("playing");
  }
  else if (currentTime===(feedTime+2)){
    foodObj.bedroom();
    game.update("sleeping");
  }else if((currentTime>(feedTime+2))&&(currentTime<=(feedTime+4))){
    foodObj.washroom();
    game.update("bathing");
  }else{
    foodObj.display();
    game.update("hungry");
  }


  if (gameState !== "hungry"){
    feedButton.hide();
    addFoodButton.hide();
    dog.remove();
  }
  else{
    feedButton.show();
    addFoodButton.show();
    foodObj.display();
    dog.addImage(dogImage);
  }

  if (feedTime !== undefined){
    fill(255);
    textSize(15);
    if(feedTime>=12){
      text("Last Feed: "+ feedTime%12 + " PM", width-150,80);
    }
    else if(feedTime===0){
      text("Last Feed: 12 AM ", width-150,80);
    }
    else{
      text("Last Feed: "+ feedTime + " AM", width-150,80);
    }
  }

  
 
  drawSprites();

  feedButton.mousePressed(function(){
    dog.addImage(happyDogImage);
    foodObj.getFoodStock();
    foodS = foodS-1;
    foodObj.updateFoodStock(foodS);
    feedTime = hour();
    database.ref('/').update({
      lastFed: feedTime
    });
    

  });

  addFoodButton.mousePressed(function(){
    foodS+=1;
    foodObj.updateFoodStock(foodS);
  });

  
  
  

}




