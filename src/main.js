//https://github.com/bohnacker/p5js-screenPosition
var easycam;
var Quad  = new Quad8(200);
var Quad_base  = new Quad8(200);

function setup(){
  createCanvas(600,400,WEBGL);
  addScreenPositionFunction();
  setAttributes('antialias', true);


  Quad_base.color = [150, 150, 150];
  Quad_base.opacity = -10;
  Quad.opacity = 100;

  easycam = createEasyCam();
  
}

function draw(){
  directionalLight(0, 0, 255, 10, 10, 0);
  background(100);

  Quad_base.draw();
  Quad.draw();
}

function mouseClicked() {
  var offset = 10;
  var xm = mouseX - width / 2;
  var ym = mouseY - height / 2;
  for(let node of Quad.n){
    var Xs = screenPosition(node.x, node.y, node.z);
    if ((abs(xm - Xs.x) < offset) && (abs(ym - Xs.y) < offset)){
      node.select();
    }
  }
}

function keyPressed() {
  var dz = 0;
  if (keyCode === UP_ARROW) {
    dz = 5;
  } else if (keyCode === DOWN_ARROW) {
    dz = -5;
  }

  for(let node of Quad.n){
    if(node.isSelected == true){
      node.update(0, 0, dz);
    }
  }
}