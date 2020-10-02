var SERVE = 0;
var YAY = 1;
var gameState = SERVE;

var ground, groundSprite;
var bg;
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody, option;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
	bg = loadImage("bg.png");
}

function setup() {
	createCanvas(1536, 718.5);
	rectMode(CENTER);
	

	packageSprite = createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.25;

	helicopterSprite = createSprite(0, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.8;

	groundSprite = createSprite(width/2, height-120, width,10);
	groundSprite.shapeColor = color(255)
    groundSprite.visible = false;

	engine = Engine.create();
	world = engine.world;

	option = {
		restitution : 3
	}

	packageBody = Bodies.circle(width/2 , 200 , 5 , {isStatic : true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, height-120, width, 10 , {isStatic : true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {

  rectMode(CENTER);

  background(bg);

  packageSprite.x = packageBody.position.x; 
  packageSprite.y = packageBody.position.y;  

  packageSprite.x = helicopterSprite.x;

  groundSprite.x = ground.position.x; 
  groundSprite.y = ground.position.y; 

  heli()

  if (gameState === SERVE) {
	fill("black");
	textFont("Times New Roman");
	textStyle(BOLD);
	textSize(40);
	text("Press down key after the helicopter stops", 390, 50);
  }
  
  drawSprites();


}
   
function heli() {
	helicopterSprite.velocityX = 10;	

	if (helicopterSprite.x > width/2){
	  helicopterSprite.velocityX = 0;
	  
	  if (keyDown(DOWN_ARROW)) {
		Matter.Body.setStatic(packageBody, false);
		packageBody.restitution = 1;

	   }

	   }

	if (packageSprite.y > 450){
	  gameState = YAY;

		if (gameState === YAY) {
			fill("black");
			textFont("Comic Sans MS");
			textStyle(BOLD);
			textSize(40);
			text("YAY! You did it!", 600, 50);
		  }

	}
	 
}

