
function preload(){
b=loadAnimation("images/b1.png","images/b2.png","images/b3.png");
bg=loadImage("images/Background.jpg");
f=loadAnimation("images/f1.png","images/f2.png","images/f3.png");
ob1=loadImage("images/o1.png");
ob2=loadImage("images/o2.png");
ob3=loadImage("images/o3.png");
cav=loadImage("images/cave1.png");

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 database = firebase.database();
bn=createSprite(displayWidth/4,displayHeight-200);
bn.addAnimation("running",b);
bn.scale=2;
fx=createSprite(displayWidth/4-200,displayHeight-215);
fx.addAnimation("running",f);
fx.scale=2;
var bnRef  = database.ref('bunny/position');
    bnRef.on("value",function(data){
       var pos = data.val();
       bn.x=pos.x;
       bn.y=pos.y;
      })
      var fxRef  = database.ref('fox/position');
    fxRef.on("value",function(data){
       var pos = data.val();
       fx.x=pos.x;
       fx.y=pos.y;
      })
cav1=createSprite(4*displayWidth+70,660);
cav1.addImage(cav);
cav1.scale=1;
}


function draw(){
  image(bg, 0, 0, displayWidth-20, displayHeight-30)
  image(bg, displayWidth-20, 0, displayWidth-20, displayHeight-30)
  image(bg, 2*displayWidth-20, 0, displayWidth-20, displayHeight-30)
  image(bg, 3*displayWidth-20, 0, displayWidth-20, displayHeight-30)
  image(bg, 4*displayWidth-20, 0, displayWidth-20, displayHeight-30)
  camera.position.x = bn.x;
  camera.position.y = displayHeight/2;
  if(keyIsDown(RIGHT_ARROW)){
    database.ref("bunny/position").set({
      x:bn.x+10,
      y:bn.y
      
    });
  }
  if(keyIsDown(LEFT_ARROW)){
    database.ref("fox/position").set({
      x:fx.x+10,
      y:fx.y
      
    });
  }
  if(bn.isTouching(cav1)){
    console.log("Bunny escaped!");
  }
    else
  if(fx.isTouching(bn)){
   console.log("End!!!");
    }
  

  drawSprites();
}


