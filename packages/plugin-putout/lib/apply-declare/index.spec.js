'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/apply-declare', plugin],
    ],
});

test('plugin-tape: apply-declare: report: declare', (t) => {
    t.report('declare', `Use 'Declarator' instead of 'operator.declare()'`);
    t.end();
});

test('plugin-tape: declare', (t) => {
    t.transform('declare');
    t.end();
});
