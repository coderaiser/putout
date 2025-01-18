'use strict';

const {createTest} = require('@putout/test');
const removeUselessNew = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-missing-new', removeUselessNew],
    ],
});

test('plugin-add-missing-new: report: new', (t) => {
    t.report('new', `Add missing operator 'new'`);
    t.end();
});

test('plugin-add-missing-new: transform: new', (t) => {
    t.transform('new');
    t.end();
});

test('plugin-add-missing-new: no report: new-exist', (t) => {
    t.noReport('new-exist');
    t.end();
});
