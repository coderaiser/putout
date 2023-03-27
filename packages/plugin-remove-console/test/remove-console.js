'use strict';

const {createTest} = require('@putout/test');
const removeConsole = require('..');

const test = createTest(__dirname, {
    'remove-console': removeConsole,
});

test('plugin-remove-console: report', (t) => {
    t.report('property-identifier', `Avoid 'console' call`);
    t.end();
});

test('plugin-remove-console: property identifier', (t) => {
    t.transform('property-identifier');
    t.end();
});

test('plugin-remove-console: property literal', (t) => {
    t.transform('property-literal', '\n\n');
    t.end();
});

test('plugin-remove-console: declared', (t) => {
    t.transform('declared');
    t.end();
});

test('plugin-remove-console: time', (t) => {
    t.transform('time', '\n\n');
    t.end();
});

test('plugin-remove-console: dir', (t) => {
    t.transformCode('console.dir()', '');
    t.end();
});
