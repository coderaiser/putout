import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-rules', plugin],
    ],
});

test('putout-config: rename-rules: report', (t) => {
    t.report('rename-rules', `Rename property: 'declare-undefined-variables' -> 'declare'`);
    t.end();
});

test('putout-config: rename-rules: transform', (t) => {
    t.transform('rename-rules');
    t.end();
});

test('putout-config: rename-rules: transform: strict-mode', (t) => {
    t.transform('strict-mode');
    t.end();
});
