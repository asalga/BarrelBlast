import Fire from './Fire.js';
import SideToSide from './SideToSide.js';
import Null from './Null.js';
import UpDown from './UpDown.js';
// import Rotate from './Rotate.js';

let traits = new Map();
traits.set('SideToSide', SideToSide);
traits.set('Fire', Fire);
traits.set('Null', Null);
traits.set('UpDown', UpDown);

export default class TraitFactory {
  static constructor() {
  }

  static create(str) {
  	let t = traits.get(str);
  	return new t();
  }
}