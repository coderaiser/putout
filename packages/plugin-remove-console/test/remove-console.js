'use strict';

const removeConsole = require('..');
const test = require('./test')(__dirname, {
    'remove-console': removeConsole
});

test('plugin-remove-console: message', (t) => {
    t.messages('property-identifier', 'Unexpected "console" call');
    t.end();
});

test('plugin-remove-console: property identifier', (t) => {
    t.transforms('property-identifier');
    t.end();
});

test('plugin-remove-console: property literal', (t) => {
    t.transforms('property-literal', '\n\n');
    t.end();
});

test('plugin-remove-console: declared', (t) => {
    t.transforms('declared');
    t.end();
});

