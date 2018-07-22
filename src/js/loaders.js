import Level from './Level.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import SpriteSheet from './SpriteSheet.js';
import { createAnim } from './anim.js';
import { createTarget } from './Entity.js';
import TraitFactory from './traits/TraitFactory.js';

export function loadJson(url) {
  return fetch(url).then(r => r.json());
}

export function loadImage(url) {
  return new Promise(function(resolve) {
    const image = new Image();

    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function loadSpriteSheet(name) {
  return loadJson(`../data/sprites/${name}.json`)
    .then(function(sheetSpec) {
      return Promise.all(
          ([sheetSpec, loadImage(sheetSpec.imageURL)])
        )
        .then(([sheetSpec, image]) => {
          const sprites = new SpriteSheet(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH);

          if (sheetSpec.tiles) {
            sheetSpec.tiles.forEach(sprite => {
              sprites.defineTile(
                sprite.name,
                sprite.index[0],
                sprite.index[1]);
            });
          }

          if (sheetSpec.frames) {
            sheetSpec.frames.forEach(frameSpec => {
              sprites.define(frameSpec.name, ...frameSpec.rect);
            });
          }

          if (sheetSpec.animations) {
            sheetSpec.animations.forEach(animSpec => {
              const anim = createAnim(animSpec.frames, animSpec.frameLength);
              sprites.defineAnim(animSpec.name, anim);
            });
          }
          return sprites;
        });
    })
}



function createTiles(level, backgrounds) {

  function applyRange(background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;

    background.ranges.forEach(range => {
      for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
          level.tiles.set(x, y, {
            name: background.tile,
            type: background.type
          });
        }
      }
    });
  }

  backgrounds.forEach(bk => {
    bk.ranges.forEach(range => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        applyRange(bk, xStart, xLen, yStart, yLen);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRange(bk, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(bk, xStart, 1, yStart, 1);
      }
    });
  });
}

// Entity loader
// given an entity json, parse it, return Set of entities


export function loadLevel(name) {
  return loadJson(`../data/levels/${name}.json`)
    .then(levelSpec => Promise.all([
      levelSpec,
      loadSpriteSheet('characters'),
      loadSpriteSheet(levelSpec.spriteSheet)
    ]))
    .then(([levelSpec, chars, backgroundSprites]) => {
      // console.log(backgroundSprites);
      const level = new Level();

      level.userStartPos = [levelSpec.userStartPos[0] * 16, levelSpec.userStartPos[1] * 16];

      createTiles(level, levelSpec.backgrounds);

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
      level.comp.layers.push(backgroundLayer);

      // Iterate over entities
      levelSpec.entities.forEach(e => {
        if (e.type === 'target') {
          let target = createTarget(backgroundSprites);
          target.pos.set((game.currLevel) * 16, 12 * 16);
          level.entities.add(target);
          level.target = target;

          e.traits.forEach(t => {
            let trait = TraitFactory.create(t.type);
            target.addTrait(trait);
          });

        }
      });

      // set position
      // Iterate over traits
      // TraitMap.get('sideToSide')
      // TraitFactory.create('sideToSide');

      const spriteLayer = createSpriteLayer(level.entities, 64);
      level.comp.layers.push(spriteLayer);

      return level;
    });
}