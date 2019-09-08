function distance(n1,n2){
  return Math.sqrt(Math.pow(n2.x-n1.x, 2) + Math.pow(n2.y-n1.y, 2) + Math.pow(n2.z-n1.z, 2));
}

function norma(x){
  return Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
}

function unitvector(x){
  var norm = norma(x);
  return [x[0] / norm, x[1] / norm, x[2] / norm];
}

function directionvector(n1, n2){
  x1 = [n1.x, n1.y, n1.z];
  x2 = [n2.x, n2.y, n2.z];
  x  = [x2[0]-x1[0], x2[1]-x1[1], x2[2]-x1[2]];
  return x;
}