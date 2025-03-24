import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['react-hooks/declare', declare],
    ],
});

test('plugin-react-hooks: declare: report: use-state', (t) => {
    t.report('use-state', `Declare 'useState', it referenced but not defined`);
    t.end();
});

test('plugin-react-hooks: declare: transform: use-state', (t) => {
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

test('plugin-react-hooks: declare: transform: use-callback', (t) => {
    t.transform('use-callback');
    t.end();
});

test('plugin-react-hooks: declare: transform: use-memo', (t) => {
    t.transform('use-memo');
    t.end();
});
