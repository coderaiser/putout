'use strict';

const convertComponentToUseState = require('.');

const test = require('@putout/test')(__dirname, {
    'convert-component-to-use-state': convertComponentToUseState,
});

test('plugin-react-hooks: convert-component-to-use-state: report', (t) => {
    t.report('component', 'useState should be used instead of Component');
    t.end();
});

test('plugin-react-hooks: convert-component-to-use-state: transform', (t) => {
    t.transform('component');
    t.end();
});

