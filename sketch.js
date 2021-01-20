var database , foodStock , dog , happydog , foodS , bottle , fedTime , lastFed , feed , addFood , foodObject;

function preload()
{
  dogImage = loadImage("dogImg.png");
  happydogImage = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodObject = new Food();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  dog = createSprite(200,300,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.5;
  feed = createButton("feed the Dog");
  feed.position(600,500);
  feed.mousePressed(FeedDog);
  addFood = createButton("addFood");
  addFood.position(500,600);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("white");
foodObject.display();
fedTime = database.ref('feedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
})
if(lastFed >= 12){
  text("lastFed : "+lastFed%12 +"PM",350,30);
}
else if(lastFed === 0){
  text("lastFed : 12AM",350 , 30);
}
else{
text("lastFed : "+lastFed+"AM" , 350 , 30);
}

  drawSprites();
}
function addFoods(){
  foodS++
database.ref('/').update({
  food:foodS
})
}
function readStock(data)
{
foodS = data.val();
foodObject.updatefoodStock(foodS);
}
function FeedDog(){
  dog.addImage(happydogImage);
  foodObject.updatefoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    food:foodObject.getFoodStock(),
    feedTime:hour()
  })
}
