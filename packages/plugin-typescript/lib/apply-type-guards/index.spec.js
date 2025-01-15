'use strict';

const {createTest} = require('@putout/test');
const applyUtilityTypes = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-guards', applyUtilityTypes],
    ],
});

test('plugin-apply-guards: report: apply-type-guards', (t) => {
    t.report('apply-type-guards', `Use 'type guards'`);
    t.end();
});

test('plugin-apply-guards: transform: apply-type-guards', (t) => {
    t.transform('apply-type-guards');
    t.end();
});
