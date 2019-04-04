'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-path-to-chunk': require('..'),
});

test('plugin-madrun: transform', (t) => {
    t.transformCode(`path.get('hi')`, `path.hi`);
    t.end();
});

