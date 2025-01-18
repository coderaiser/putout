'use strict';

const {createTest} = require('@putout/test');
const convertComponentToUseState = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-component-to-use-state', convertComponentToUseState],
    ],
});

test('plugin-react-hooks: convert-component-to-use-state: report: component', (t) => {
    t.report('component', 'useState should be used instead of Component');
    t.end();
});

test('plugin-react-hooks: convert-component-to-use-state: transform: component', (t) => {
    t.transform('component');
    t.end();
});
