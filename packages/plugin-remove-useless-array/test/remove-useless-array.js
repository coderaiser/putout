'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-array', plugin],
    ],
});

test('putout: remove-useless-array: report', (t) => {
    t.report('remove-useless-array', `Avoid array inside property accessors`);
    t.end();
});

test('putout: remove-useless-array: transform', (t) => {
    t.transform('remove-useless-array');
    t.end();
});
