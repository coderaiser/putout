'use strict';

const test = require('@putout/test')(__dirname, {
    npmignore: require('..'),
});

test('plugin-putout: transform', (t) => {
    t.transform('npmignore');
    t.end();
});

