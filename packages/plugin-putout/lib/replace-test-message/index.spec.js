'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/replace-test-message', plugin],
    ],
});

test('plugin-putout: replace-test-message: report', (t) => {
    t.report('replace-test-message', `Use ': transform' in test message when using 't.transform()'`);
    t.end();
});

test('plugin-putout: replace-test-message: transform', (t) => {
    t.transform('replace-test-message');
    t.end();
});

test('plugin-putout: replace-test-message: no report', (t) => {
    t.noReport('transform');
    t.end();
});

test('plugin-putout: replace-test-message: transform: wrong', (t) => {
    t.transform('wrong');
    t.end();
});
