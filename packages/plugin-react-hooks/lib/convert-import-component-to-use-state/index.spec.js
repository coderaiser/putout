import {createTest} from '@putout/test';
import * as convertImportComponentToUseState from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-import-component-to-use-state', convertImportComponentToUseState],
    ],
});

test('plugin-react-hooks: convert-import-component-to-use-state: report: component', (t) => {
    t.report('component', 'useState should be used instead of Component');
    t.end();
});

test('plugin-react-hooks: convert-import-component-to-use-state: transform', (t) => {
    t.transformCode(`import {Component} from 'react'`, `import {useState} from 'react';\n`);
    t.end();
});

test('plugin-react-hooks: convert-import-component-to-use-state: transform: component', (t) => {
    t.transform('component');
    t.end();
});
