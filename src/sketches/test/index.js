/*
  Andor Saga
  Barrel Blast
*/

'use strict';

import Test from './test.js';
import {User,Barrel} from './Entity.js';
import {Vec2D} from './math.js';

let user, testBarrel;
let debug = false;

var sketch = function(p) {

	let update = function (dt) {
		user.update(dt);
		testBarrel.update(dt);
	};

	let resetGame = function(){
		user = new User({
			pos: new Vec2D(100,100)
		});

		testBarrel = new Barrel({
			pos: new Vec2D(200,100)
		});

		testBarrel.insert(user);
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

		user.render(p);
		testBarrel.render(p);
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













