'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-forward-ref', plugin],
    ],
});

test('react: remove-useless-forward-ref: report', (t) => {
    t.report('remove-useless-forward-ref', `Avoid useless 'forwardRef' in react > 19`);
    t.end();
});

test('react: remove-useless-forward-ref: transform', (t) => {
    t.transform('remove-useless-forward-ref');
    t.end();
});
