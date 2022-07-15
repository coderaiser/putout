'use strict';

const {createTest} = require('@putout/test');
const convertStateToHooks = require('.');

const test = createTest(__dirname, {
    'convert-state-to-hooks': convertStateToHooks,
});

test('plugin-react-hooks: convert state tot hooks: report', (t) => {
    t.report('react-hooks', 'hooks should be used instead of this.state');
    t.end();
});

test('plugin-react-hooks: convert state to hooks: transform', (t) => {
    t.transform('react-hooks');
    t.end();
});

test('plugin-react-hooks: convert state to hooks: no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});

test('plugin-react-hooks: convert state to hooks: no transform: declare', (t) => {
    t.noTransform('declare');
    t.end();
});

