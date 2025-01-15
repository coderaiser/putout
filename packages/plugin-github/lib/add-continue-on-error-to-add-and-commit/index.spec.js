'use strict';

const {createTest} = require('@putout/test');
const plugin = require('./index.js');

const test = createTest(__dirname, {
    plugins: [
        ['github/add-continue-on-error-to-add-and-commit', plugin],
    ],
});

test('plugin-github: add continue-on-error to add-and-commit: report: add-continue-on-error-to-add-and-commit', (t) => {
    t.report('add-continue-on-error-to-add-and-commit', `Add 'continue-on-error' to 'EndBug/add-and-commit'`);
    t.end();
});

test('plugin-github: continue-on-error to add-and-commit: transform: add-continue-on-error-to-add-and-commit', (t) => {
    t.transform('add-continue-on-error-to-add-and-commit');
    t.end();
});
