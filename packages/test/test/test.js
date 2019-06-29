'use strict';

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole,
});

test('test: message', (t) => {
    t.report('property-identifier', 'Unexpected "console" call');
    t.end();
});

test('test: message', (t) => {
    t.report('property-identifier', [
        'Unexpected "console" call',
        'Unexpected "console" call',
        'Unexpected "console" call',
    ]);
    
    t.end();
});

test('test: reportCode', (t) => {
    t.reportCode('console.log()', 'Unexpected "console" call');
    t.end();
});

test('test: transformCode', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});

test('test: noTransformCode', (t) => {
    t.noTransformCode('alert()');
    t.end();
});

test('test: property identifier', (t) => {
    t.transform('property-identifier');
    t.end();
});

test('test: property literal', (t) => {
    t.transform('property-literal', '\n\n');
    t.end();
});

test('test: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('test: transform: typescript', (t) => {
    t.transform('typescript', '\n');
    t.end();
});

