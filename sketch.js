var numpoints = 200;
var col;
var alph;
var w = [];
var off = [];

function setup() 
{
  createCanvas(1600, 900);
  smooth();
  strokeWeight(2);
  refresh();
}

function refresh()
{
  for (var i=0; i<6; i++) {
    w.push(random(0.001,0.02));
    off.push(random(10));
  }
  col = color(random(50,255), random(50,255), random(50,255));
  alph = 0;
}

function draw() 
{
 
  //background(50);
  //rotateX(millis() / 1000);
  
  // update superformula parameters
  var a  = map( sin(w[0]*frameCount + off[0]), -1, 1, -1, 1);
  var b  = map( sin(w[1]*frameCount + off[1]), -1, 1, -1, 1); 
  var m  = map( sin(w[2]*frameCount + off[2]), -1, 1, -20, 50);
  var n1 = map( sin(w[3]*frameCount + off[3]), -1, 1,  5, 10);
  var n2 = map( sin(w[4]*frameCount + off[4]), -1, 1, -10, 10);
  var n3 = map( sin(w[5]*frameCount + off[5]), -1, 1, -10, 10);
 
  // fade background
  alph = lerp(alph, 30, 0.01);
  fill(0, alph);
  noStroke();
  rect(0, 0, width, height);
 
  // rotate screen
  translate(width/2, height/2);
  rotate(map(noise(0.0001*frameCount), 0, 1, -PI, PI));
  
  stroke(255, 120);
  fill(col, 20);
  beginShape(POINTS);
  for (var i=0; i<numpoints; i++) {
    var long = lerp(-PI, PI, i/numpoints);
    var r1 = pow( (pow( abs(cos(m*long/4)/a), n2 ) +
                    pow( abs(sin(m*long/4)/b), n3 ) ), -1/n1 );
    var lat = lerp(-HALF_PI, HALF_PI, i/numpoints);
    var r2 = pow( (pow( abs(cos(m*lat/4)/a), n2 ) +
                    pow( abs(sin(m*lat/4)/b), n3 ) ), -1/n1 );
    var x = 300 * r1 * cos(long) * r2 * cos(lat);
    var y = 300 * r1 * sin(long) * r2 * cos(lat);
    var z = 300 * r2 * sin(lat);
    curveVertex(x, y, z);
  }
  endShape(CLOSE);
  
  if (frameCount % 360 == 0) refresh();
}

//function mousePressed() {
//  setup();
//}
