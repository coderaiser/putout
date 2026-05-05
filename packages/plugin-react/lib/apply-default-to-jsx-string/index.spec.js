import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-default-to-jsx-string', plugin],
    ],
});

test('react: apply-default-to-jsx-string: report', (t) => {
    t.report('apply-default-to-jsx-string', `Apply default to toJsxString`);
    t.end();
});

test('react: apply-default-to-jsx-string: transform', (t) => {
    t.transform('apply-default-to-jsx-string');
    t.end();
});
