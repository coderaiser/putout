import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-equal', plugin],
    ],
});

test('conditions: apply-equal: report', (t) => {
    t.report('apply-equal', `Use '===' instead of '=' when return a value`);
    t.end();
});

test('conditions: apply-equal: transform', (t) => {
    t.transform('apply-equal');
    t.end();
});
