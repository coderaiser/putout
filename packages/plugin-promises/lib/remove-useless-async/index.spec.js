import {createTest} from '@putout/test';
import * as removeUselessAsync from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-async', removeUselessAsync],
    ],
});

test('plugin-remove-useless-async: report: async', (t) => {
    t.report('async', `Avoid useless 'async'`);
    t.end();
});

test('plugin-remove-useless-async: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-remove-useless-async: transform: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-useless-async: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-remove-useless-async: transform: args-fn', (t) => {
    t.transform('args-fn');
    t.end();
});

test('plugin-remove-useless-async: transform: generator', (t) => {
    t.transform('generator');
    t.end();
});

test('plugin-remove-useless-async: transform: export-default', (t) => {
    t.transform('export-default');
    t.end();
});

test('plugin-remove-useless-async: no transform: no-body-arrow', (t) => {
    t.noTransform('no-body-arrow');
    t.end();
});

test('plugin-remove-useless-async: no transform: throw', (t) => {
    t.noTransform('throw');
    t.end();
});

test('plugin-remove-useless-async: no transform: await', (t) => {
    t.noTransform('await');
    t.end();
});

test('plugin-remove-useless-async: no report: using', (t) => {
    t.noReport('using');
    t.end();
});

test('plugin-remove-useless-async: no transform: for-of', (t) => {
    t.noTransform('for-of');
    t.end();
});

test('plugin-remove-useless-async: no report: type', (t) => {
    t.noReport('type');
    t.end();
});

test('plugin-remove-useless-async: no transform: for-await-of', (t) => {
    t.noTransform('for-await-of');
    t.end();
});

test('plugin-remove-useless-async: no transform: noop', (t) => {
    t.noTransformCode('const a = async () => {};\n');
    t.end();
});
