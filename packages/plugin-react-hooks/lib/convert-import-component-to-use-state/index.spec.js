'use strict';

const {createTest} = require('@putout/test');
const convertImportComponentToUseState = require('.');

const test = createTest(__dirname, {
    'convert-import-component-to-use-state': convertImportComponentToUseState,
});

test('plugin-react-hooks: convert-import-component-to-use-state: report', (t) => {
    t.report('component', 'useState should be used instead of Component');
    t.end();
});

test('plugin-react-hooks: convert-import-component-to-use-state: transform', (t) => {
    t.transformCode(`import {Component} from 'react'`, `import {useState} from 'react'`);
    t.end();
});

test('plugin-react-hooks: convert-import-component-to-use-state: transform: component', (t) => {
    t.transform('component');
    t.end();
});

