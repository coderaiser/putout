import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-parens', plugin],
    ],
});

test('putout-config: apply-parens: report', (t) => {
    t.report('apply-parens', `Rename property: 'add-missing-parens' -> 'parens/add-missing'`);
    t.end();
});

test('putout-config: apply-parens: transform', (t) => {
    t.transform('apply-parens');
    t.end();
});
