'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-mapping-modifiers': require('..'),
});

test('plugin-remove-useless-mapping-modifiers: report', (t) => {
    t.report('mapping-modifiers', 'Avoid useless mapping modifiers');
    t.end();
});

test('plugin-remove-useless-mapping-modifiers: transform', (t) => {
    t.transform('mapping-modifiers');
    t.end();
});

