'use strict';

const test = require('@putout/test')(__dirname, {
    'declare-undefined-variables': require('..'),
});

test('putout: plugin: declare-undefined-variables: report: assign', (t) => {
    t.report('assign', 'Variable should be declared');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: assign: dismiss', (t) => {
    t.noTransformWithOptions('assign', {
        dismiss: ['assign', 'stringify'],
    });
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: parse', (t) => {
    t.transformWithOptions('parse', {
        dismiss: ['assign', 'stringify'],
    });
    
    t.end();
});

