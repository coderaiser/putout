'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'putout/convert-number-to-numeric': plugin,
});

test('plugin-putout: convert-number-to-numeric: report', (t) => {
    t.report('convert-number-to-numeric', `Use 'isNumericLiteral()' instead of 'isNumberLiteral()'`);
    t.end();
});

test('plugin-putout: convert-number-to-numeric: transform', (t) => {
    t.transform('convert-number-to-numeric');
    t.end();
});

test('plugin-putout: convert-numeber-to-numeric: transform: create-node', (t) => {
    t.transform('create-node');
    t.end();
});

