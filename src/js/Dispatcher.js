let instance = null;

// will hold data for the listeners
class DispatcherEvent{
}

export class Dispatcher {
  constructor() {
    if (instance == null) {
      instance = this;
      this.listeners = {};
    }
    return instance;
  }

  on(evtName, cb) {
    // don't have any listeners for this event yet
    if (typeof this.listeners[evtName] == 'undefined') {
    	// Use set so we don't have to check for duplicates
      this.listeners[evtName] = new Set;
    }
    this.listeners[evtName].add(cb)
    console.log(this.listeners[evtName]);
  }

  fire(e) {
    let evtName = e.evtName;
    if (typeof this.listeners[evtName] !== 'undefined') {
      this.listeners[evtName].forEach(e => e());
    }
  }

  off(evtName, cb) {
  	if(typeof this.listeners[evtName] == 'undefined'){
  		return;
  	}
  	this.listeners[evtName].delete(cb);
  }
}
