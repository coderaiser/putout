'use strict';

const browserilist = require('..');

const test = require('@putout/test')(__dirname, {
    browserilist,
});

test('plugin-putout: transform: node', (t) => {
    t.transform('browserlist');
    t.end();
});

