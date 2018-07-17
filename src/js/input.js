import Keyboard from './KeyboardState.js';

export function setupKeyBoard(entity) {
    const input = new Keyboard();

    input.addMapping('Space', function(keyState) {
        if (keyState === 1) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    // convert 1 or 0 to -1 or 1
    input.addMapping('ArrowLeft', function(keyState) {
        entity.go.direction -= keyState ? 1 : -1;
    });
    input.addMapping('ArrowRight', function(keyState) {
        entity.go.direction += keyState ? 1 : -1;
    });

    return input;
}