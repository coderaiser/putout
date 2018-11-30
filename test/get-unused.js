'use strict';

const test = require('tape');
const getUnused = require('../lib/get-unused');

test('get-unused', (t) => {
    const result = getUnused([{
        count: 2,
    }, {
        count: 1
    }]);
    
    const expected = [{
        count: 1,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});
