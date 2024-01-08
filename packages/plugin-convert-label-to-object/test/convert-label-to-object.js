'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-label-to-object', plugin],
    ],
});

test('putout: convert-label-to-object: report', (t) => {
    t.report('convert-label-to-object', `Convert 'label' to 'object'`);
    t.end();
});

test('putout: convert-label-to-object: transform', (t) => {
    t.transform('convert-label-to-object');
    t.end();
});

test('putout: convert-label-to-object: no report: no-label', (t) => {
    t.noReport('no-label');
    t.end();
});
