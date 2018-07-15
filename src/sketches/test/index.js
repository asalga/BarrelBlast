/*
  Andor Saga
  Barrel Blast
*/

'use strict';

import Test from './test.js';
import {User,Barrel} from './Entity.js';
import {Vec2D} from './math.js';

let user, srcBarrel, dstBarrel;
let debug = false;

var sketch = function(p) {

	let update = function (dt) {
		// user.update(dt);

		srcBarrel.update(dt);
		dstBarrel.update(dt);
	};

	let resetGame = function(){
		user = new User({});

		srcBarrel = new Barrel({
			pos: new Vec2D(50,100)
		});

		dstBarrel = new Barrel({
			pos: new Vec2D(150,0)
		});

		srcBarrel.addChild(user);
	}

	p.setup = function(){
		console.log('setup');
		p.createCanvas(300, 300);
		p.rectMode(p.CENTER);
		resetGame();
	};

	p.draw = function(){
		p.background(100);

		update(0.016);

		// p.push();
		// user.render(p);
		p.push();
		srcBarrel.render(p);
		dstBarrel.render(p);
		p.pop();
		// p.pop();
	};

	p.keyReleased = function(key) {
		// console.log('key released' , key);

		if(key.code == "Space"){
			user.launch();
		}
		else if(key.code == "KeyR"){
			resetGame();
		}
		else if(key.code == "KeyD"){
			debug = !debug;
		}

	};

};

let _p5 = new p5(sketch);













