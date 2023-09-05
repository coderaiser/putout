'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['set-setup-quemu-version', plugin],
    ],
});

test('packages: set-setup-quemu-version: report', (t) => {
    t.report('set-setup-quemu-version', `Latest version of 'setup-quemu-action' is missing`);
    t.end();
});

test('packages: set-setup-quemu-version: transform', (t) => {
    t.transform('set-setup-quemu-version');
    t.end();
});
