import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-create-root', plugin],
    ],
});

test('react: apply-create-root: report', (t) => {
    t.report('apply-create-root', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('react: apply-create-root: transform', (t) => {
    t.transform('apply-create-root');
    t.end();
});

test('react: apply-create-root: transform: specifiers', (t) => {
    t.transform('specifiers');
    t.end();
});
