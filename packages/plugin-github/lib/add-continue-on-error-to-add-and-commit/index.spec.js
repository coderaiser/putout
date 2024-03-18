'use strict';

const plugin = require('./index.js');
const {createTest} = require('@putout/test');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['github/add-continue-on-error-to-add-and-commit', plugin],
    ],
});

test('plugin-github: add continue-on-error to add-and-commit: report', (t) => {
    t.report('add-continue-on-error-to-add-and-commit', `Add 'continue-on-error' to 'EndBug/add-and-commit'`);
    t.end();
});

test('plugin-github: continue-on-error to add-and-commit: transform', (t) => {
    t.transform('add-continue-on-error-to-add-and-commit');
    t.end();
});
