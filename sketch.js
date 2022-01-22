// By Roni Kaufman

let kMax;
let step;
let n = 300; // number of blobs
let radius = 0; // diameter of the circle
let inter; // difference between the sizes of two blobs
let maxNoise = 500;
let clockwise;
let angle;

let noiseProg = (x) => (x*x*x);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  noFill();
	//noLoop();
	kMax = 20;
	step = 0.05;
	inter = 1;
	if (random() < 0.5) {
		clock = true;
	} else {
		clock = false;
	}
	angle = random(-QUARTER_PI, QUARTER_PI);
	
  background(0.05);
}

function draw() {
	translate(width/2, height/2);
  rotate(angle + random(-0.1, 0.1));
	
	if (frameCount < n) {
		let i = frameCount;
		let alpha = 1 - i / n;
		stroke(0.95, alpha);
		let size = radius + i * inter;
		let k = kMax * (i / n);
		let noisiness = maxNoise * noiseProg(i / n);
    blobSpiral(size, 0, 0, k, i * step, noisiness, clock);
  } else {
		noLoop();
	}
}

function blobSpiral(size, xCenter, yCenter, k, t, noisiness, clockwise) {
	let f = 1;
	if (!clockwise) {
		f *= -1;
	}
	let theta0 = random() * 2 * PI;
	let theta = theta0;
	let s;
	let h = random(0.6, 0.9);
	while ((theta < theta0 + 2 * PI) && (theta > theta0 - 2 * PI)) {
    let r1, r2;
		r1 = cos(theta) + 1;
		r2 = sin(theta) + 1;
		if (clockwise) {
		  s = map(theta, theta0, theta0 + 2 * PI, radius, size);
		} else {
			s = map(theta, theta0, theta0 - 2 * PI, radius, size);
		}
    let r = s + noise(k * r1, k * r2, t) * noisiness * random(0.8, 1.2);
		let rh = r * h;
    let x = xCenter + r * cos(theta);
    let y = yCenter + rh * sin(theta);
    circle(x, y, random(0.01, 0.05));
		theta += 0.01 * f;
  }
}