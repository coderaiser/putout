'use strict';

const test = require('@putout/test')(__dirname, {
    nodejs: require('..'),
});

test('cloudcmd: convert-fs-promises: transform', (t) => {
    t.transform('fs');
    t.end();
});

