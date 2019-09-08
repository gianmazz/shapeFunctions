class Quad4{

  n = [];
  localPoints = [];
  constructor(elLength){
    this.elLength = elLength;
    this.n.push(new Node(-elLength / 2, -elLength / 2, 0));
    this.n.push(new Node( elLength / 2, -elLength / 2, 0));
    this.n.push(new Node( elLength / 2,  elLength / 2, 0));
    this.n.push(new Node(-elLength / 2,  elLength / 2, 0));
    this.color = [0, 150, 255];
    this.opacity = 0;
    this.subdivision = 3;
    this.localPoints = this.setLocalPoints();
    this.localDisp = this.initializeLocalDisp();
    //console.log(this.localPoints);
  }

  setLocalPoints(){
    var dx = this.elLength / this.subdivision;
    var dy = this.elLength / this.subdivision;
    var localPoints = [];
    var x = -this.elLength / 2;
    var y = -this.elLength / 2;
    for(var iy = 0; iy <= this.subdivision; iy++){
      for(var ix = 0; ix <= this.subdivision; ix++){
        localPoints.push([x, y, 0]);
        x = x + dx;
      }
      y = y + dy;
      x = -this.elLength / 2;
    }
    return localPoints;
  }

  initializeLocalDisp(){
    var localDisp = [];
    for(var iy = 0; iy <= this.subdivision; iy++){
      for(var ix = 0; ix <= this.subdivision; ix++){
        localDisp.push([0, 0, 0]);
      }
    }
    return localDisp;
  }

  shapeFunction(x){
    var x1 = [this.n[0].x, this.n[0].y, this.n[0].z];
    var x2 = [this.n[1].x, this.n[1].y, this.n[1].z];
    var x3 = [this.n[2].x, this.n[2].y, this.n[2].z];
    var x4 = [this.n[3].x, this.n[3].y, this.n[3].z];
    var a = this.elLength / 2;
    var b = this.elLength / 2;
    var N1 = (x[0] - x2[0]) * (x[1] - x4[1]) / (4 * a * b);
    var N2 = -(x[0] - x1[0]) * (x[1] - x3[1]) / (4 * a * b);
    var N3 = (x[0] - x4[0]) * (x[1] - x2[1]) / (4 * a * b);
    var N4 = -(x[0] - x3[0]) * (x[1] - x1[1]) / (4 * a * b);
    return [N1, N2, N3, N4];
  }

  update(){
    for(var i = 0; i < Math.pow(this.subdivision + 1, 2); i++){

      var N = this.shapeFunction(this.localPoints[i]);
      //console.log(N);
      this.localDisp[i][0] = 0;
      this.localDisp[i][1] = 0;
      this.localDisp[i][2] = 0;
       for(var j = 0; j < 4; j++){
         this.localDisp[i][0] = this.localDisp[i][0] + N[j] * this.n[j].ux;
         this.localDisp[i][1] = this.localDisp[i][1] + N[j] * this.n[j].uy;
         this.localDisp[i][2] = this.localDisp[i][2] + N[j] * this.n[j].uz;
       }
    }
  }

  spatialCoords(pointID){
    var i = pointID;
    return [this.localPoints[i][0]+this.localDisp[i][0],this.localPoints[i][1]+this.localDisp[i][1],this.localPoints[i][2]+this.localDisp[i][2]];
  }

  draw(){
    for(var i = 0; i < 4; i++){
      this.n[i].draw();
    }

    this.update();
    // for(var i = 0; i < Math.pow(this.subdivision + 1, 2); i++){
    //   push();
    //   fill(50);
    //   noStroke();
    //   var x = this.spatialCoords(i);
    //   translate(x[0], x[1], x[2]);
    //   sphere(2);
    //   pop();
    // }
    if (this.opacity == 0){
      fill(this.color[0], this.color[1], this.color[2]);
    }else{
      fill(this.color[0], this.color[1], this.color[2], this.opacity);
    }
    stroke(0);
    var sub = this.subdivision;
    for(var ey = 0; ey < sub; ey++){
      for(var ex = 0; ex < sub; ex++){
        var x1 = this.spatialCoords(ey * (1 + sub) + ex    );
        var x2 = this.spatialCoords(ey * (1 + sub) + ex + 1);
        var x3 = this.spatialCoords((1 + ey) * (1 + sub) + ex + 1);
        var x4 = this.spatialCoords((1 + ey) * (1 + sub) + ex);
        beginShape();
        vertex(x1[0], x1[1], x1[2]);
        vertex(x2[0], x2[1], x2[2]);
        vertex(x3[0], x3[1], x3[2]);
        vertex(x4[0], x4[1], x4[2]);
        endShape(CLOSE);
      }
    }

    //ambientMaterial(this.color[0], this.color[1], this.color[2]);
  }
}