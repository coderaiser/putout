'use strict';

const {createTest} = require('@putout/test');
const rm = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-unused-private-fields', rm],
    ],
});

test('plugin-remove-unused-private-fields: report', (t) => {
    t.report('class', 'private field "#world" declared by not used');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: class', (t) => {
    t.transform('class');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: class expression', (t) => {
    t.transform('class-expression');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: class anonymous', (t) => {
    t.transform('class-anonymous');
    t.end();
});

test('plugin-remove-unused-private-fields: transform: private method', (t) => {
    t.transform('private-method');
    t.end();
});

test('plugin-remove-unused-private-fields: no transform: no destructuring', (t) => {
    t.noTransform('destructuring');
    t.end();
});
