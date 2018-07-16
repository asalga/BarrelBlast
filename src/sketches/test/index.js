/*
  Andor Saga
  Barrel Blast
*/

'use strict';

import Test from './test.js';
import { User, Barrel } from './Entity.js';
import { Vec2D } from './math.js';
import { TraitUpDown } from './Trait.js';
import { Config } from './config.js';

let user, srcBarrel, dstBarrel;
let debug = false;
let scene;


var sketch = function(p) {

  let update = function(dt) {
    scene.forEach(v => v.update(dt));
  };

  let resetGame = function() {
    scene = new Set;
    window.scene = scene;
    user = new User({});

    srcBarrel = new Barrel({ pos: new Vec2D(50, 100) });
    srcBarrel.addChild(user);

    dstBarrel = new Barrel({ pos: new Vec2D(150, 200) });
    dstBarrel.addTrait(new TraitUpDown());

    scene.add(srcBarrel);
    scene.add(dstBarrel);
  }

  p.setup = function() {
    console.log('setup');
    p.createCanvas(Config.GameWidth, Config.GameHeight);
    p.rectMode(p.CENTER);
    resetGame();
  };

  p.draw = function() {
    p.background(100);

    update(0.016);

    scene.forEach(v => v.render(p));
  };

  p.keyReleased = function(key) {
    // console.log('key released' , key);

    if (key.code == "Space") {
      user.launch();
    } else if (key.code == "KeyR") {
      resetGame();
    } else if (key.code == "KeyD") {
      debug = !debug;
    }

  };

};

let _p5 = new p5(sketch);