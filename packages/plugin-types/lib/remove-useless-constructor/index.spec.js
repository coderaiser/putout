'use strict';

const {createTest} = require('@putout/test');
const removeUselessConstructor = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['types/remove-useless-constructor', removeUselessConstructor],
    ],
});

test('plugin-types: remove-useless-constructor: report', (t) => {
    t.report('constructor', 'Avoid useless constructor');
    t.end();
});

test('plugin-types: remove-useless-constructor: transform', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-types: remove-useless-constructor: no transform: not-string', (t) => {
    t.noTransform('not-string');
    t.end();
});
