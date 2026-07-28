import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-boolean', plugin],
    ],
});

test('types: apply-boolean: report', (t) => {
    t.report('apply-boolean', `Use 'Boolean' instead of '!!'`);
    t.end();
});

test('types: apply-boolean: transform', (t) => {
    t.transform('apply-boolean');
    t.end();
});
