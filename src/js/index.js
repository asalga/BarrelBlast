/*
  Andor Saga
*/

'use strict';

import { User, Barrel, createUser } from './Entity.js';
import { Vec2D } from './math.js';
import { Config } from './config.js';
import Timer from './Timer.js';
import Camera from './Camera.js';
import { loadLevel } from './loaders.js';
import { setupKeyBoard } from './input.js';
import { Dispatcher } from './Dispatcher.js';
import KeyBoard from './keyboardState.js';
import { loadSpriteSheet } from './loaders.js';

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
    loadSpriteSheet('User'),
    loadLevel(`${game.currLevel}`)
  ])
  .then(([sheet, level]) => {
    const camera = new Camera();
    let d = new Dispatcher();

    // Debugging
    const kb = new KeyBoard();
    kb.addMapping('KeyR', state => {
      if (state === 1) {
        d.fire({ evtName: "restartGame" });
      }
    });
    kb.listenTo(window);


    let user = createUser(sheet);
    user.pos.set(level.userStartPos[0], level.userStartPos[1]);
    level.entities.add(user);

    // TODO: fix 
    // game.resetAnimFrame();
    if (timer) { timer.stop(); }

    timer = new Timer;
    timer.update = function(dt) {
      level.update(dt);
      level.comp.draw(ctx, camera);
    }
    timer.start();


    var loadNextLevel = function loadNextLevel() {
      // prevent events from being fired many times
      d.off('targetHit', loadNextLevel);
      game.currLevel++;
      if (game.currLevel > 2) {
        game.currLevel = 1;
      }

      loadLevel(`${game.currLevel}`).then((l) => {
        level = l;
        user = createUser(sheet);
        level.entities.add(user);
        user.pos.set(level.userStartPos[0], level.userStartPos[1]);
        d.on('targetHit', loadNextLevel);
      });
    }

    let restartGame = function() {
      user = createUser(sheet)
      game.currLevel = 0;
      loadNextLevel();
    }

    // EVENTS
    d.on('targetHit', loadNextLevel);
    d.on('restartGame', restartGame);
  });