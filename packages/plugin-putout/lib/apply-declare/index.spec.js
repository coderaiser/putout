'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');
const test = createTest(__dirname, {
    'tape/apply-declare': plugin,
});

test('plugin-tape: apply-declare: report', (t) => {
    t.report('declare', `Use 'Declarator' instead of 'operator.declare'`);
    t.end();
});

test('plugin-tape: apply-declare', (t) => {
    t.transform('declare');
    t.end();
});

