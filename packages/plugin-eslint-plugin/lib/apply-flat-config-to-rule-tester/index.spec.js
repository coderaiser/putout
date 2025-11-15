import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-flat-config-to-rule-tester', plugin],
    ],
});

test('packages: apply-flat-config-to-rule-tester: report', (t) => {
    t.report('apply-flat-config-to-rule-tester', `Use FlatConfig in RuleTester`);
    t.end();
});

test('packages: apply-flat-config-to-rule-tester: transform', (t) => {
    t.transform('apply-flat-config-to-rule-tester');
    t.end();
});
