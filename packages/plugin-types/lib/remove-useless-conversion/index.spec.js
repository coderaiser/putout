'use strict';

const {createTest} = require('@putout/test');
const removeUselessTypeConversion = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-conversion', removeUselessTypeConversion],
    ],
});

test('putout: plugin-types: remove-useless-conversion: named: report', (t) => {
    t.report('bool', 'Avoid useless type conversion');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform', (t) => {
    t.transform('bool');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform: typeof', (t) => {
    t.transform('typeof');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform: while', (t) => {
    t.transform('while');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform: for', (t) => {
    t.transform('for');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform: for-start', (t) => {
    t.transform('for-start');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform: for-end', (t) => {
    t.transform('for-end');
    t.end();
});

test('putout: plugin-types: remove-useless-conversion: named: transform: ternary', (t) => {
    t.transform('ternary');
    t.end();
});
