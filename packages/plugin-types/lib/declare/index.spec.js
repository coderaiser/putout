'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    declare,
});

test('putout: plugin: types: declare: report', (t) => {
    t.report('declare', `Declare 'isString', it referenced but not defined`);
    t.end();
});

test('putout: plugin: types: declare', (t) => {
    t.transform('declare');
    t.end();
});

