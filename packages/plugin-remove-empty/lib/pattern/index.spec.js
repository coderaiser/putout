import {createTest} from '@putout/test';
import montag from 'montag';
import * as removeEmptyPattern from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-pattern', removeEmptyPattern],
    ],
});

test('plugin-remove-empty: pattern: report: object', (t) => {
    t.reportCode('const {} = obj', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: pattern: report: array', (t) => {
    t.reportCode('const [] = array', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: pattern: report: array: many elements', (t) => {
    t.reportCode('const [,,,] = array', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: pattern: object', (t) => {
    t.transformCode('const {} = object', '\n');
    t.end();
});

test('plugin-remove-empty: pattern: array', (t) => {
    t.transformCode('const [] = array', '\n');
    t.end();
});

test('plugin-remove-empty: pattern: let', (t) => {
    t.transformCode(montag`
        let [,,,] = x;
        let {} = y;
    `, '\n');
    t.end();
});

test('plugin-remove-empty: pattern: assignment', (t) => {
    const code = montag`
        [,,,] = x;
        ({} = y);
    `;
    
    t.transformCode(code, '\n');
    t.end();
});

test('plugin-remove-empty: pattern: transform: array: many elements', (t) => {
    t.transformCode('const [,,,] = array', '\n');
    t.end();
});

test('plugin-remove-empty: pattern: argument: object destructuring', (t) => {
    t.transformCode('({}) => alert()', '() => alert();\n');
    t.end();
});

test('plugin-remove-empty: pattern: argument: array destructuring', (t) => {
    t.transformCode('([]) => alert()', '() => alert();\n');
    t.end();
});

test('plugin-remove-empty: pattern: argument: couple-empty', (t) => {
    t.transformCode('([,,,]) => alert()', '() => alert();\n');
    t.end();
});

test('plugin-remove-empty: pattern: argument: object destructuring: not empty', (t) => {
    t.noTransformCode('({a}) => alert();\n');
    t.end();
});

test('plugin-remove-empty: pattern: argument: array destructuring: not empty', (t) => {
    t.noTransformCode('([a]) => alert();\n');
    t.end();
});

test('plugin-remove-empty: pattern: destructuring: not empty: many', (t) => {
    t.noTransformCode('const [, b] = alert();\n');
    t.end();
});

test('plugin-remove-empty: pattern: transform: nested array destructuring', (t) => {
    t.transformCode('const [, {}] = getOptions()', '\n');
    t.end();
});

test('plugin-remove-empty: pattern: transform: nested array destructuring: array', (t) => {
    t.transformCode('const [, []] = getOptions()', '\n');
    t.end();
});

test('plugin-remove-empty: pattern: no transform: nested array destructuring', (t) => {
    t.noTransformCode('const [{rule}] = options;\n');
    t.end();
});

test('plugin-remove-empty: pattern: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-remove-empty: pattern: transform: null', (t) => {
    t.transform('null');
    t.end();
});

test('plugin-remove-empty: pattern: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-empty: pattern: no report: no-args', (t) => {
    t.noReport('no-args');
    t.end();
});

test('plugin-remove-empty: pattern: transform: var: object', (t) => {
    t.transformCode('var {} = object', '\n');
    t.end();
});

test('plugin-remove-empty: pattern: transform: var: array', (t) => {
    t.transformCode('var [] = array', '\n');
    t.end();
});
