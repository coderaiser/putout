import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-camel-case', plugin],
    ],
});

test('coverage: apply-camel-case: report', (t) => {
    t.report('apply-camel-case', `Use camelCase instead of kebab: 'check-coverage' -> 'checkCoverage'`);
    t.end();
});

test('coverage: apply-camel-case: transform', (t) => {
    t.transform('apply-camel-case');
    t.end();
});
