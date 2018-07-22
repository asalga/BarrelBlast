/*
  Andor Saga
*/

'use strict';

import { User, Barrel, createUser, createTarget } from './Entity.js';
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
    loadSpriteSheet('Characters'),
    loadLevel(`${game.currLevel}`)
  ])
  .then(([sheet, chars, level]) => {
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

    let makeUser = function() {
      user = createUser(sheet);
      user.pos.set(level.userStartPos[0], level.userStartPos[1]);
      level.entities.add(user);
      level.user = user;
    }
    makeUser();

    // let makeTarget = function() {
    //   let target = createTarget(chars);
    //   target.pos.set((game.currLevel) * 16, 12 * 16);
    //   level.entities.add(target);
    //   level.target = target;
    // }
    // makeTarget();

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
      if (++game.currLevel > 2) {
        game.currLevel = 1;
      }
      console.log(game.currLevel);

      loadLevel(`${game.currLevel}`).then((l) => {
        level = l;
        makeUser();
        // makeTarget();
        d.on('targetHit', loadNextLevel);
      });
    }


    let restartGame = function() {
      game.currLevel = 0;
      loadNextLevel();
    }

    // EVENTS
    d.on('targetHit', loadNextLevel);
    d.on('restartGame', restartGame);
    d.on('hitOther', restartGame);
  });