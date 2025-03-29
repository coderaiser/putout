import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-emitter-to-promise', convert],
    ],
});

test('plugin-tape: convert-emitter-to-promise: end', (t) => {
    t.report('end', '"await once" should be used');
    t.end();
});

test('plugin-tape: convert-emitter-to-promise: function: end', (t) => {
    t.transform('end');
    t.end();
});

test('plugin-tape: convert-emitter-to-promise: function: error', (t) => {
    t.transform('error');
    t.end();
});

test('plugin-tape: convert-emitter-to-promise: function: no', (t) => {
    t.noTransform('no');
    t.end();
});

test('plugin-tape: convert-emitter-to-promise: function: var', (t) => {
    t.transform('var');
    t.end();
});

test('plugin-tape: convert-emitter-to-promise: function: exists', (t) => {
    t.transform('exists');
    t.end();
});

test('plugin-tape: convert-emitter-to-promise: function: any', (t) => {
    t.transform('any');
    t.end();
});

test('plugin-tape: convert-emitter-to-promise: template', (t) => {
    t.transform('template');
    t.end();
});
