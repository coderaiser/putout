import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-ts-codeblock-to-file', plugin],
    ],
});

test('putout: apply-ts-codeblock-to-file: report', (t) => {
    t.report('apply-ts-codeblock-to-file', `Use 'ts' instead of 'js' fence for TypeScript`);
    t.end();
});

test('putout: apply-ts-codeblock-to-file: transform', (t) => {
    t.transform('apply-ts-codeblock-to-file');
    t.end();
});
