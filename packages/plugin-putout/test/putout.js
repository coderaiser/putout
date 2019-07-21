'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('..'),
});

test('plugin-madrun: transform', (t) => {
    t.transform('no-transform-code');
    t.end();
});

