var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;
var fedTime
var currentTime
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
 feedTheDog=createButton("feed the dog");
 feedTheDog.position(700,95);
 feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  currentTime=hour()
  console.log (currentTime)
 
  //write code to display text lastFed time here
  fedTime = database.ref ('feedTime')
  fedTime.on("value", function(data){
    lastFed = data.val()
  })
  textSize(30)
  fill("red")
  if(lastFed>=12){
    text("lastFeed:"+lastFed%12+"PM",200,50)
  }
 else if(lastFed === 0){
  text("lastFeed:12 AM",200,50)
 }
 else{
  text("lastFeed:"+lastFed+"AM",200,50)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_Val = foodObj.getFoodStock();
if(food_stock_Val <=0){
  foodObj.updateFoodStock(food_stock_Val *0);
}
else {
  foodObj.updateFoodStock(food_stock_Val -1)
}
database.ref('/').update({ 
  food:foodObj.getFoodStock(),
  feedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
