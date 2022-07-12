'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    'react-hooks/declare': declare,
});

test('plugin-react-hooks: declare: report', (t) => {
    t.report('use-state', `Declare 'useState'`);
    t.end();
});

test('plugin-react-hooks: declare: transform', (t) => {
    t.transform('use-state');
    t.end();
});

test('plugin-react-hooks: declare: transform: use-effect', (t) => {
    t.transform('use-effect');
    t.end();
});

test('plugin-react-hooks: declare: transform: use-context', (t) => {
    t.transform('use-context');
    t.end();
});

test('plugin-react-hooks: declare: transform: use-reducer', (t) => {
    t.transform('use-reducer');
    t.end();
});

