'use strict';

const test = require('@putout/test')(__dirname, {
    browserilist: require('..'),
});

test('plugin-putout: transform: node', (t) => {
    t.transform('browserlist');
    t.end();
});

