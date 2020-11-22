'use strict';

const test = require('@putout/test')(__dirname, {
    gitignore: require('..'),
});

test('plugin-putout: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

