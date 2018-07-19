/*
  Andor Saga
*/

'use strict';

import { User, Barrel, createMario } from './Entity.js';
import { Vec2D } from './math.js';
import { TraitUpDown } from './Trait.js';
import { Config } from './config.js';
import Timer from './Timer.js';
import Camera from './Camera.js';
import { loadLevel } from './loaders.js';
import { setupKeyBoard } from './input.js';
import { Dispatcher } from './Dispatcher.js';

let user, srcBarrel, dstBarrel;
let debug = false;
let scene, gameBounds, timer;
window.game = {};
window.currLevel = 1;

let cvs = document.getElementById('cvs');
let ctx = cvs.getContext('2d');

Promise
  .all([
    createMario(),
    loadLevel('' + window.currLevel)
  ])
  .then(([mario, level]) => {
    const camera = new Camera();

    const input = setupKeyBoard(mario);
    input.listenTo(window);

    let d = new Dispatcher();
    d.on('targetHit', function() {
      window.currLevel++;
      loadLevel('' + window.currLevel).then((l) => {
        level = l;
        // level.entities.remove()
        level.entities.add(mario);
        mario.pos.set(32, 64);
      });
    });

    mario.pos.set(32, 64);
    level.entities.add(mario);

    // TODO: fix 
    // game.resetAnimFrame();
    if (timer) { timer.stop(); }

    timer = new Timer;
    timer.update = function(dt) {
      level.update(dt);
      level.comp.draw(ctx, camera);

      // scene.forEach(v => v.update(dt));
      // p.background(200);
      // scene.forEach(v => v.render(p));
    }

    timer.start();
  });

// level.comp.layers.push(createDebugCollisionLayer(level, camera),createCameraLayer(camera));
// setupMouseControl(canvas, camera, mario);

// const input = setupKeyBoard(mario);
// input.listenTo(window);

// const timer = new Timer();
// timer.update = function(deltaTime) {
//     level.update(deltaTime);

//     if (mario.pos.x > 100) {
//         camera.pos.x = mario.pos.x - 100;
//     }

//     level.comp.draw(context, camera);
// };
//   });
// }

//   p.setup = function() {
//     console.log('setup');
//     p.createCanvas(Config.GameWidth, Config.GameHeight);
//     p.rectMode(p.CENTER);
//     resetGame();
//   };

//   p.keyReleased = function(key) {
//     // console.log('key released' , key);

//     if (key.code == "Space") {
//       user.launch();
//     } else if (key.code == "KeyR") {
//       resetGame();
//     } else if (key.code == "KeyD") {
//       debug = !debug;
//     } else if (key.code == "KeyP") {
//       timer.pause();
//     }
//   };
// };

// var sketch = function(p) {
//   let resetGame = function() {
//     window.game.reset = resetGame;
// scene = new Set;
// // TODO: fix

// window.game.scene = scene;
// user = new User({});

// srcBarrel = new Barrel({ pos: new Vec2D(50, 100) });
// srcBarrel.addChild(user);

// dstBarrel = new Barrel({ pos: new Vec2D(150, 200) });
// dstBarrel.addTrait(new TraitUpDown());

// scene.add(srcBarrel);
// scene.add(dstBarrel);