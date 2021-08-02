'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-component-to-use-state': require('.'),
});

test('plugin-react-hooks: convert-component-to-use-state: report', (t) => {
    t.report('component', 'useState should be used instead of Component');
    t.end();
});

test('plugin-react-hooks: convert-component-to-use-state: transform', (t) => {
    t.transform('component');
    t.end();
});

