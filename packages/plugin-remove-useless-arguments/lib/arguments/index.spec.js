import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-arguments/arguments', plugin],
    ],
});

test('plugin-remove-useless-arguments: arguments: report: arg', (t) => {
    t.report('arg', `Avoid useless argument 'callback'`);
    t.end();
});

test('plugin-remove-useless-arguments: arguments: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-useless-arguments: arguments: transform: var', (t) => {
    t.transform('var');
    t.end();
});

test('plugin-remove-useless-arguments: arguments: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless-arguments: arguments: no transform: not-fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-remove-useless-arguments: arguments: no transform: not fn: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('plugin-remove-useless-arguments: arguments: no transform: arguments', (t) => {
    t.noTransform('arguments');
    t.end();
});

test('plugin-remove-useless-arguments: arguments: report: fn', (t) => {
    t.report('fn', 'Avoid useless argument');
    t.end();
});
