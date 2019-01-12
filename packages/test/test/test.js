'use strict';

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole
});

test('test: message', (t) => {
    t.messages('property-identifier', 'Unexpected "console" call');
    t.end();
});

test('test: message', (t) => {
    t.messages('property-identifier', [
        'Unexpected "console" call',
        'Unexpected "console" call',
        'Unexpected "console" call',
    ]);
    
    t.end();
});

test('test: property identifier', (t) => {
    t.transforms('property-identifier');
    t.end();
});

test('test: property literal', (t) => {
    t.transforms('property-literal', '\n\n');
    t.end();
});

test('test: declared', (t) => {
    t.transforms('declared');
    t.end();
});

