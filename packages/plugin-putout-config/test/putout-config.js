'use strict';

const test = require('@putout/test')(__dirname, {
    'putout-config': require('..'),
});

test('plugin-putout-config: transform', (t) => {
    t.transform('bool');
    t.end();
});

