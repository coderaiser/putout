'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-missing-for-assign', plugin],
    ],
});

test('putout: plugin-parens: add-missing-for-assign: report', (t) => {
    t.report('add-missing-for-assign', `SyntaxError: Invalid left-hand side in assignment expression`);
    t.end();
});

test('putout: plugin-parens: add-missing-for-assign: transform', (t) => {
    t.transform('add-missing-for-assign');
    t.end();
});

test('putout: plugin-parens: add-missing-for-assign: transform: binary', (t) => {
    t.transform('binary');
    t.end();
});

test('putout: plugin-parens: add-missing-for-assign: transform: unary', (t) => {
    t.transform('unary');
    t.end();
});
