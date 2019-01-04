'use strict';

const test = require('tape');
const getUnused = require('../lib/rm-unused-vars/get-unused');

test('get-unused', (t) => {
    const result = getUnused([{
        name: 'a',
        declared: true,
        used: false,
    }, {
        name: 'b',
        declared: true,
        used: true,
    }]);
    
    const expected = [{
        name: 'a',
        declared: true,
        used: false,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});
