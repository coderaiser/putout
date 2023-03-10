'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    'maybe/declare': declare,
});

test('plugin-maybe: declare: report', (t) => {
    t.report('declare', `Declare 'maybeArray', it referenced but not defined`);
    t.end();
});

test('plugin-maybe: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});

