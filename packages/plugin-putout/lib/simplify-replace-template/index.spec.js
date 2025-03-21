import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['simplify-replace-template', plugin],
    ],
});

test('putout: simplify-replace-template: report', (t) => {
    t.report('simplify-replace-template', `Simplify replace template`);
    t.end();
});

test('putout: simplify-replace-template: transform', (t) => {
    t.transform('simplify-replace-template');
    t.end();
});
