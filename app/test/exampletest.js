const assert = require('chai').assert;
const example = require('../../example');

describe('example', function() {
    it('example should return 2', function() {
        assert.equal(example(), 2);
    });
});