'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    'math/declare': declare,
});

test('plugin-math: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});

