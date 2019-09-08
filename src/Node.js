class Node{

  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.ux = 0;
    this.uy = 0;
    this.uz = 0;
    this.color0 = [0, 250, 0];
    this.color = this.color0;
    this.size = 5;
    this.isSelected = false;
  }

  select(){
    if (this.isSelected == true){
      this.isSelected = false;
    }else{
      this.isSelected = true
    }
  }

  update(dux, duy, duz){
    this.ux += dux;
    this.uy += duy;
    this.uz += duz;
  }

  spatialCoords(){
    return [this.x + this.ux, this.y + this.uy, this.z + this.uz];
  }

  draw(){
    //stroke(this.color[0], this.color[1], tthis.color[2])
    //point(this.x, this.y, this.z)
    //fill(this.color[0]);
    //ellipse(this.x, this.y, this.size, this.size);
    if (this.isSelected == true){
      this.color = [255, 0, 255];
    }else{
      this.color = this.color0;
    }
    push();
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    translate(this.x + this.ux, this.y + this.uy, this.z + this.uz);
    sphere(this.size);
    pop();
  }
}