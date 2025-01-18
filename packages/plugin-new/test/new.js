'use strict';

const {createTest} = require('@putout/test');
const pluginNew = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['new', pluginNew],
    ],
});

test('plugin-new: report: new', (t) => {
    t.report('new', `Add missing operator 'new'`);
    t.end();
});

test('plugin-new: transform: new', (t) => {
    t.transform('new');
    t.end();
});
