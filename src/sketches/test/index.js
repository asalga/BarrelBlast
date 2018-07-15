/*
  Andor Saga
  Barrel Blast
*/

// Define user posiiton

'use strict';
import Test from './test.js';

let user = {
	x: 20,
	y: 100
};

var sketch = function(p) {
	
	p.setup = function(){
		console.log('test');
		p.createCanvas(300, 300);
	};

	p.draw = function(){
		p.background(100);
		p.rect(user.x, user.y, 30, 30);
	};

};
let _p5 = new p5(sketch);