'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
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
