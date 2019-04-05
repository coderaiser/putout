'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-path-to-chunk': require('..'),
});

test('codemod-convert-path-to-chunk: transform', (t) => {
    t.transformCode(`path.get('hi')`, `chunk.hi`);
    t.end();
});

