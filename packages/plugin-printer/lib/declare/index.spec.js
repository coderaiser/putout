'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['declare', plugin],
    ],
});

test('printer: declare: report', (t) => {
    t.report('declare', `Declare 'isIdentifier', it referenced but not defined`);
    t.end();
});

test('printer: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});
