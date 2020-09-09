var dog, happyDog, database, foodS, foodStock;
var hungryDogImg, nothungryDogImg;

function preload()
{
  hungryDogImg = loadImage("dogImg.png");
  nothungryDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(800, 800);

  dog = createSprite(350, 450, 20, 20);
  dog.addImage(hungryDogImg);
  

  foodStock = database.ref('Food');
foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(nothungryDogImg);
    }

  drawSprites();
  textSize(20);
  stroke("black");
  fill("white");
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 100, 100);

}


function readStock(data){
  foodS = data.val();
}
  
  
function writeStock(x){
  
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}
