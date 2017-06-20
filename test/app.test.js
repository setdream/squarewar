const assert = require('assert');
import App from '../src/app/app';

describe('APP', function() {
  describe('Main module', function() {
    const app = new App();

    it('test function should return -1', function() {
      assert.equal(-1, app.test());
    });
  });
});