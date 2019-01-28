'use strict';

const applyDestructuring = require('..');
const merge = require('@putout/plugin-merge-destructuring-properties');

const test = require('@putout/test')(__dirname, {
    'apply-destructuring': applyDestructuring 
});

test('plugin-apply-destructuring: transform: report', (t) => {
    t.report('object', 'Object destructuring should be used');
    t.end();
});

test('plugin-apply-destructuring: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-apply-destructuring: transform: multiple', (t) => {
    t.transform('multiple', {
        'merge-destructuring-properties': merge
    });
    
    t.end();
});
