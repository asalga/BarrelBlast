const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {

    constructor() {
        this.keyStates = new Map;
        this.keyMap = new Map;
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const { code, type } = event;

        if (!this.keyMap.has(code)) {
            return;
        }

        event.preventDefault();

        const keyState = type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);
        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
    	let self = this;
        ['keyup', 'keydown'].forEach(function(eventName) {
            window.addEventListener(eventName, (event) => {
                self.handleEvent(event);
            });
        });
    }
}