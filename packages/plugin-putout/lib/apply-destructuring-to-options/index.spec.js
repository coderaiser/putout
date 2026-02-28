import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-destructuring-to-options', plugin],
    ],
});

test('putout: apply-destructuring-to-options: report', (t) => {
    t.report('apply-destructuring-to-options', `Use '{options}' instead of 'options'`);
    t.end();
});

test('putout: apply-destructuring-to-options: transform', (t) => {
    t.transform('apply-destructuring-to-options');
    t.end();
});
