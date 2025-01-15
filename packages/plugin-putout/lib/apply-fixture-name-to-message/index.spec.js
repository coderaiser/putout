'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-fixture-name-to-message', plugin],
    ],
});

test('putout: apply-fixture-name-to-message: report', (t) => {
    t.report('apply-fixture-name-to-message', `Apply 'fixture' name to 'message'`);
    t.end();
});

test('putout: apply-fixture-name-to-message: transform', (t) => {
    t.transform('apply-fixture-name-to-message');
    t.end();
});

test('putout: apply-fixture-name-to-message: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});
