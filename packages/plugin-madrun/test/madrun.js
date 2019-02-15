'use strict';

const madrun = require('..');
const test = require('@putout/test')(__dirname, {
    madrun,
});

test('plugin-madrun: transform', (t) => {
    t.transform('madrun');
    t.end();
});

