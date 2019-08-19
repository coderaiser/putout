'use strict';

const rm = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-unused-private-fields': rm,
});

test('plugin-remove-unused-private-fields: transform: report', (t) => {
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

test('plugin-remove-unused-private-fields: transform: private method', (t) => {
    t.transform('private-method');
    t.end();
});

