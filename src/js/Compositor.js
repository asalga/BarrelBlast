export default class Compositor {
  constructor() {
    this.layers = [];
  }

  drawBackground(ctx){
  	// in case some sprites are transparent, we need a safe bk color
    ctx.fillStyle = 'rgb(98, 173, 255';
    ctx.fillRect(0, 0, 500, 500);
  }

  draw(ctx, camera) {
	this.drawBackground(ctx);
    this.layers.forEach(layerFunc => layerFunc(ctx, camera));
  }
}