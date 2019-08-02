'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('..'),
});

test('plugin-putout: transform', (t) => {
    t.transform('no-transform-code');
    t.end();
});

