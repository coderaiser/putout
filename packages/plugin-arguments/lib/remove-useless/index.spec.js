import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as removeUnused from '../remove-unused/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['arguments/remove-useless', plugin],
    ],
});

test('putout: plugin-arguments: remove-useless: report: arg', (t) => {
    t.report('arg', `Avoid useless argument 'callback'`);
    t.end();
});

test('putout: plugin-arguments: remove-useless: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('putout: plugin-arguments: remove-useless: transform: var', (t) => {
    t.transform('var');
    t.end();
});

test('putout: plugin-arguments: remove-useless: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('putout: plugin-arguments: remove-useless: no transform: not-fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('putout: plugin-arguments: remove-useless: no transform: not fn: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('putout: plugin-arguments: remove-useless: no transform: arguments', (t) => {
    t.noTransform('arguments');
    t.end();
});

test('putout: plugin-arguments: remove-useless: transform: used', (t) => {
    t.transform('used');
    t.end();
});

test('putout: plugin-arguments: remove-useless: transform: arguments-not-referenced', (t) => {
    t.transform('arguments-not-referenced');
    t.end();
});

test('putout: plugin-arguments: remove-useless: transform: unused', (t) => {
    t.transform('unused', {
        removeUnused,
    });
    t.end();
});

test('putout: plugin-arguments: remove-useless: report: fn', (t) => {
    t.report('fn', 'Avoid useless argument');
    t.end();
});
