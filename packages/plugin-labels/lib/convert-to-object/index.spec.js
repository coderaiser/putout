'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-to-object', plugin],
    ],
});

test('putout: convert-to-object: report', (t) => {
    t.report('convert-to-object', `Convert 'label' to 'object'`);
    t.end();
});

test('putout: convert-to-object: transform', (t) => {
    t.transform('convert-to-object');
    t.end();
});

test('putout: convert-to-object: no report: no-label', (t) => {
    t.noReport('no-label');
    t.end();
});
