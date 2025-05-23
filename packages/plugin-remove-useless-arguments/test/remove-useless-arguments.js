import {createTest} from '@putout/test';
import * as removeUselessArguments from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-arguments', removeUselessArguments],
    ],
});

test('plugin-remove-useless-arguments: report: call', (t) => {
    t.report('call', `Avoid useless argument 'generate' of a function 'onIfStatement()'`);
    t.end();
});

test('plugin-remove-useless-arguments: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-remove-useless-arguments: transform: scope', (t) => {
    t.transform('scope');
    t.end();
});

test('plugin-remove-useless-arguments: transform: diff-values', (t) => {
    t.transform('diff-values');
    t.end();
});

test('plugin-remove-useless-arguments: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-useless-arguments: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not-object', (t) => {
    t.noTransform('not-object');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: deep', (t) => {
    t.noTransform('deep');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: no-declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not-defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

test('plugin-remove-useless-arguments: transform: method', (t) => {
    t.transform('method');
    t.end();
});

test('plugin-remove-useless-arguments: transform: unused', (t) => {
    t.transform('unused');
    t.end();
});

test('plugin-remove-useless-arguments: transform: json-parse', (t) => {
    t.transform('json-parse');
    t.end();
});
