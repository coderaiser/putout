'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    'montag/declare': declare,
});

test('plugin-montag: declare: report', (t) => {
    t.report('montag', `Declare 'montag'`);
    t.end();
});

test('plugin-montag: declare: transform', (t) => {
    t.transform('montag');
    t.end();
});

