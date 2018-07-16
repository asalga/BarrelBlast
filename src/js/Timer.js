export default class Timer {
  constructor(timeStep = 1/60) {
    let self = this;
    let accTime = 0;
    let last = 0;
    this.isPaused = false;
    this.rId = null;
    
    this.updateProxy = function(now) {
      accTime += (now - last) / 1000;
      // console.log(accTime);

      if (accTime > 1) {
        console.log(`accTime was ${accTime} and set to 1`);
        accTime = 1;
      }

      while(accTime > timeStep){
        // debugger;
      	// console.log(`acctime was > 1.`);
        if(!self.isPaused){
          self.update(timeStep);
        }
      	accTime -= timeStep;
      }
      last = now;
      self.enqueue();
    }
  }

  stop(){
     cancelAnimationFrame(this.rId);
  }

  enqueue() {
    this.rId = requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }

  pause(){
    this.isPaused = !this.isPaused;
  }
}