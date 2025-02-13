'use strict';

const {createTest} = require('@putout/test');
const rm = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-unused-private-fields', rm],
    ],
});

test('plugin-remove-unused-private-fields: report: class', (t) => {
    t.report('class', 'Private field "#world" declared by not used');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: class', (t) => {
    t.transform('class');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: class-expression', (t) => {
    t.transform('class-expression');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: class-anonymous', (t) => {
    t.transform('class-anonymous');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: private-method', (t) => {
    t.transform('private-method');
    t.end();
});

test('plugin-remove-unused-private-fields: no transform: destructuring', (t) => {
    t.noTransform('destructuring');
    t.end();
});

test('plugin-remove-unused-private-fields: no report: private', (t) => {
    t.noReport('private');
    t.end();
});
