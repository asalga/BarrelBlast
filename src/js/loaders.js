'use strict';

import Level from './Level.js';

function loadJson(path) {
  console.log('loadJson with: ', path);

  return fetch(path)
    .then(function(res) {
      return res.json();
    });
  //r => { return r.json()});
}




/*
	passed in something like:

		path: world0	
*/
function loadSpriteSheet(path) {
  console.log('loadSpriteSheet');

  // return loadJson(path);
}


/*
	Populate level
*/
function createTiles(level, backgrounds){

	function applyRange(bk, xStart, xLen, yStart, yLen){
	}

	backgrounds.forEach(bk => {

	});
}

/*
	path - something in:  levels/

	data/levels/world_0.json

{
  "levels": [
    {
      "spriteSheet": "world0",
      "backgrounds": [{
          "tile": "sky",
          "ranges": [
            [
              0, 256,
		...
		...
*/
export function loadLevel(path) {
  console.log(`loadLevel ${path}`);

  return loadJson(path)
    .then(function(levelSpec) {
      // console.log('-->', levelSpec);

      return Promise.all([
        levelSpec
        // loadSpriteSheet()
      ]).then(([levelSpec]) => {
      	// once we have the level data and sprites, we can create the levels

      	let level = new Level();
      	createTiles(level, levelSpec.backgrounds);
      	return level;
 
        // console.log("> ", levelSpec);
      });
    });
}