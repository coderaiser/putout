'use strict';

const {createTest} = require('@putout/test');
const removeUselessConstructor = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-constructor', removeUselessConstructor],
    ],
});

test('plugin-remove-useless-constructor: report: constructor', (t) => {
    t.report('constructor', 'Avoid useless constructor');
    t.end();
});

test('plugin-remove-useless-constructor: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});
