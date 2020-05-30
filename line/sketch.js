
function Particle() {
  this.x = random(w);
  this.y = random(h);
  this.oldX = this.x;
  this.oldY = this.y;
}

Particle.prototype.move = function(stepSize) {
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += random(-stepSize, stepSize);
  this.y += random(-stepSize, stepSize);
  if(this.x < 0) this.x = 0;
  if(this.x > w) this.x = w;
  if(this.y < 0) this.y = 0;
  if(this.y > h) this.y = h;
}

Particle.prototype.draw = function() {
  line(this.oldX, this.oldY, this.x, this.y);
}

var particles;
var iterations;
var theImage;
var px;
var w;
var h;

function preload() {
  theImage = loadImage('img/art.jpg'); 
}

function setup() {
  cursor(HAND);
  iterations = 200;
  particleCount = 200;
  w = theImage.width; 
  h = theImage.height;
  createCanvas(w, h);
  reset();
  stroke(0, 10);
}

function draw() {
  for(var i = 0; i < iterations; i++) {
    particles.forEach(p => {
      var x = floor(p.x);
      var y = floor(p.y);
      var off = (y * w + x) * 4; 
      var m = (px[off] + px[off+1] + px[off+2]) / 3;
      var stepSize = map(m, 0, 255, 1, 10);
      p.move(stepSize);
      p.draw();
    });
  }
}



function initParticles() {
  particles = [];
  for(var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}
//get pixel
function initImage() {
  image(theImage, 0, 0);
  var img = get(0, 0, w, h);
  img.loadPixels();
  px = img.pixels;
  background(255);
}

function reset() {
  initParticles();
  clear();
  initImage();
}

function mouseClicked() {
  reset();
}
