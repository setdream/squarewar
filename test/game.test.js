const assert = require('assert');

import MainScene from '../src/game/scenes/MainScene';
import GAME_OBJECT_TYPES from '../src/game/consts/game-object.types';

describe('GAME', function() {

    const scene = new MainScene({
      minSize: 20,
      maxSize: 100,
      count: 2,
      maxSpeed: 150,
      minSpeed: 20,
      field: {
          width: 250,
          height: 150
      },
    });

    it('It create objects', function() {
      assert.ok(scene.count() > 0);
    });

    it('It create field', function() {
      assert.equal(4, scene.countByKey('type', GAME_OBJECT_TYPES.RECTANGLE));
    });

    it('It create squares', function() {
      assert.equal(2, scene.countByKey('type', GAME_OBJECT_TYPES.SQUARE));
    });

    it('It work collision', function() {
      const objects = scene.findByKey('type', GAME_OBJECT_TYPES.SQUARE);

      objects[0].position.x = 10;
      objects[0].position.x = 100;

      scene.tick(0.001);

      assert.equal(4, scene.countByKey('type', GAME_OBJECT_TYPES.SQUARE));
    });
});