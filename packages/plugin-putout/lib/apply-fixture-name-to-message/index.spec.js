'use strict';

const {createTest} = require('@putout/test');
const pluginTape = require('@putout/plugin-tape');
const plugin = require('.');

const removeOnly = pluginTape.rules['remove-only'];

const test = createTest(__dirname, {
    plugins: [
        ['apply-fixture-name-to-message', plugin],
    ],
});

test('putout: apply-fixture-name-to-message: report: apply-fixture-name-to-message', (t) => {
    t.report('apply-fixture-name-to-message', `Apply 'fixture' name to 'message'`);
    t.end();
});

test('putout: apply-fixture-name-to-message: transform: apply-fixture-name-to-message', (t) => {
    t.transform('apply-fixture-name-to-message');
    t.end();
});

test('putout: apply-fixture-name-to-message: transform: partial', (t) => {
    t.transform('partial');
    t.end();
});

test('putout: apply-fixture-name-to-message: no report: no-parent', (t) => {
    t.noReport('no-parent');
    t.end();
});

test('putout: apply-fixture-name-to-message: no report: used', (t) => {
    t.noReport('used');
    t.end();
});

test('putout: apply-fixture-name-to-message: transform: only', (t) => {
    t.transform('only');
    t.end();
});

test('putout: apply-fixture-name-to-message: no report: remove-only', (t) => {
    t.transform('remove-only', {
        removeOnly,
    });
    t.end();
});
