'use strict';

function loadJson(path) {
  return fetch(path).then( r => {
  	console.log('fetching:', path );
  	return r.json();
  });
}


