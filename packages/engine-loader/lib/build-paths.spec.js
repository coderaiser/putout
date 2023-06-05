'use strict';

const test = require('supertape');
const buildPaths = require('./build-paths');

test('get-plugins: build-paths', (t) => {
    const result = buildPaths('/hello/world');
    
    const expected = [
        '/node_modules',
        '/hello/node_modules',
        '/hello/world/node_modules',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
