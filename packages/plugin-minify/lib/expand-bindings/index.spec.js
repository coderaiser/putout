import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['expand-bindings', plugin],
    ],
});

test('plugin-minify: expand-bindings: report', (t) => {
    t.report('expand-bindings', `Expand bindings`);
    t.end();
});

test('plugin-minify: expand-bindings: transform', (t) => {
    t.transform('expand-bindings');
    t.end();
});

test('plugin-minify: expand-bindings: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('plugin-minify: expand-bindings: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-minify: expand-bindings: no transform: destructuring', (t) => {
    t.noTransform('destructuring');
    t.end();
});
