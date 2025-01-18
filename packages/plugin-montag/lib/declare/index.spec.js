'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['montag/declare', declare],
    ],
});

test('plugin-montag: declare: report: montag', (t) => {
    t.report('montag', `Declare 'montag', it referenced but not defined`);
    t.end();
});

test('plugin-montag: declare: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});
