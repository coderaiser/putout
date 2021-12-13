'use strict';

const {createTest} = require('@putout/test');
const convertComponentToUseState = require('.');

const test = createTest(__dirname, {
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

