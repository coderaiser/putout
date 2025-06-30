import {createTest} from '@putout/test';
import * as pluginTape from '@putout/plugin-tape';
import * as plugin from './index.js';

const removeOnly = pluginTape.rules['remove-only'];

const test = createTest(import.meta.url, {
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

test('putout: apply-fixture-name-to-message: transform: remove-only', (t) => {
    t.transform('remove-only', {
        removeOnly,
    });
    t.end();
});

test('putout: apply-fixture-name-to-message: options', (t) => {
    t.transform('options');
    t.end();
});

test('putout: apply-fixture-name-to-message: brace', (t) => {
    t.noReport('brace');
    t.end();
});

test('putout: apply-fixture-name-to-message: no-report-after-transform', (t) => {
    t.transform('no-report-after-transform');
    t.end();
});

test('putout: apply-fixture-name-to-message: no-report-with-options', (t) => {
    t.transform('no-report-with-options');
    t.end();
});

test('putout: apply-fixture-name-to-message: undefined', (t) => {
    t.noReport('undefined');
    t.end();
});
