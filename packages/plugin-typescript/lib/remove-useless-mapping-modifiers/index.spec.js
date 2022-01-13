'use strict';

const {createTest} = require('@putout/test');
const removeUselessMappingModifiers = require('.');

const test = createTest(__dirname, {
    'typescript/remove-useless-mapping-modifiers': removeUselessMappingModifiers,
});

test('plugin-remove-useless-mapping-modifiers: report', (t) => {
    t.report('mapping-modifiers', 'Avoid useless mapping modifiers');
    t.end();
});

test('plugin-remove-useless-mapping-modifiers: transform', (t) => {
    t.transform('mapping-modifiers');
    t.end();
});

