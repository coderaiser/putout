'use strict';

const {createTest} = require('@putout/test');
const pluginNew = require('..');

const test = createTest(__dirname, {
    new: pluginNew,
});

test('plugin-new: report', (t) => {
    t.report('new', `Add missing operator 'new'`);
    t.end();
});

test('plugin-new: transform', (t) => {
    t.transform('new');
    t.end();
});

