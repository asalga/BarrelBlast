/*
  Andor Saga
*/

'use strict';

import { User, Barrel, createUser } from './Entity.js';
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
window.game = {
  currLevel: 1
};

let cvs = document.getElementById('cvs');
let ctx = cvs.getContext('2d');

Promise
  .all([
    createUser(),
    loadLevel(`${game.currLevel}`)
  ])
  .then(([user, level]) => {
    const camera = new Camera();

    const input = setupKeyBoard(user);
    input.listenTo(window);

    user.pos.set(level.userStartPos[0], level.userStartPos[1]);
    level.entities.add(user);

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

    

    let d = new Dispatcher();
    var loadNextLevel = function loadNextLevel() {
      // prevent events from being fired many times
      d.off('targetHit', loadNextLevel);
      game.currLevel++;
      if (game.currLevel > 2) {
        game.currLevel = 1;
      }

      loadLevel(`${game.currLevel}`).then((l) => {
        level = l;
        level.entities.add(user);
        user.pos.set(level.userStartPos[0], level.userStartPos[1]);
        d.on('targetHit', loadNextLevel);
      });
    }
    d.on('targetHit', loadNextLevel);
  });