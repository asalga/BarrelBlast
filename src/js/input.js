import Keyboard from './KeyboardState.js';

export function setupKeyBoard(entity) {
  const input = new Keyboard();

  input.addMapping('Space', (e) => {
    entity.fire.start();
  });

  return input;
}