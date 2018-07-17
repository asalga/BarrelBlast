export default class Compositor {
  constructor() {
    this.layers = [];
  }

  draw(context, camera) {
    this.layers.forEach(layerFunc => layerFunc(context, camera));
  }
}