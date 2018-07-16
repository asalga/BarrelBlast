/*
  Andor Saga
*/

'use strict';

import { User, Barrel } from './Entity.js';
import { Vec2D } from './math.js';
import { TraitUpDown } from './Trait.js';
import { Config } from './config.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';

let user, srcBarrel, dstBarrel;
let debug = false;
let scene;
let gameBounds;
window.game = {};
let timer;

var sketch = function(p) {

  let resetGame = function() {
    window.game.reset = resetGame;



    ///////
    Promise.all([
        loadLevel('../data/levels/world_0.json')
      ])
      .then(([level]) => {
        console.log('done loading', level);
      });
    ///////



    scene = new Set;
    // TODO: fix

    window.game.scene = scene;
    user = new User({});

    srcBarrel = new Barrel({ pos: new Vec2D(50, 100) });
    srcBarrel.addChild(user);

    dstBarrel = new Barrel({ pos: new Vec2D(150, 200) });
    dstBarrel.addTrait(new TraitUpDown());

    scene.add(srcBarrel);
    scene.add(dstBarrel);

    // TODO: fix 
    // game.resetAnimFrame();
    if (timer) { timer.stop(); }

    timer = new Timer(1 / 60);
    timer.update = function(dt) {
      scene.forEach(v => v.update(dt));
      p.background(200);
      // scene.forEach(v => v.render(p));
    }

    timer.start();
  }

  p.setup = function() {
    console.log('setup');
    p.createCanvas(Config.GameWidth, Config.GameHeight);
    p.rectMode(p.CENTER);
    resetGame();
  };

  p.keyReleased = function(key) {
    // console.log('key released' , key);

    if (key.code == "Space") {
      user.launch();
    } else if (key.code == "KeyR") {
      resetGame();
    } else if (key.code == "KeyD") {
      debug = !debug;
    } else if (key.code == "KeyP") {
      timer.pause();
    }
  };

};

let _p5 = new p5(sketch);