'use strict';

const test = require('supertape');
const merge = require('./merge');

test('putout: merge', (t) => {
    const defaultConfig = {
        plugins: [
            'remove-unused-variables',
        ],
    };
    
    const result = merge(defaultConfig, {
        plugins: [
            'extract-sequence-expressions',
        ],
    });
    
    const expected = {
        plugins: [
            'extract-sequence-expressions',
            'remove-unused-variables',
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

