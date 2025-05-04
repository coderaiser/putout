import {createTest} from '@putout/test';
import * as putout from '@putout/plugin-putout';
import * as tryCatch from '@putout/plugin-try-catch';
import * as promises from '@putout/plugin-promises';
import * as printer from '@putout/plugin-printer';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as nodejs from '@putout/plugin-nodejs';
import * as reuseDuplicateInit from '@putout/plugin-reuse-duplicate-init';
import * as tape from '@putout/plugin-tape';
import * as removeUselessVariables from '@putout/plugin-remove-useless-variables';
import * as removeUselessArguments from '@putout/plugin-remove-useless-arguments';
import * as declare from '../lib/declare-before-reference.js';

const addTEnd = tape.rules['add-t-end'];

const test = createTest(import.meta.url, {
    plugins: [
        ['declare-before-reference', declare],
    ],
});

test('plugin-declare-before-reference: report: declare', (t) => {
    t.report('declare', `Declare 'operator' before referencing to avoid 'ReferenceError'`);
    t.end();
});

test('plugin-declare-before-reference: no report: class', (t) => {
    t.noReport('class');
    t.end();
});

test('plugin-declare-before-reference: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-declare-before-reference: transform: no-loc', (t) => {
    t.transform('no-loc');
    t.end();
});

test('plugin-declare-before-reference: transform: order', (t) => {
    t.transform('order');
    t.end();
});

test('plugin-declare-before-reference: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-declare-before-reference: transform: putout', (t) => {
    t.transform('putout', {
        putout,
    });
    t.end();
});

test('plugin-declare-before-reference: transform: try-to-catch', (t) => {
    t.transform('try-to-catch', {
        tryCatch,
        'promises/apply-to-level-await': promises.rules['apply-top-level-await'],
    });
    t.end();
});

test('plugin-declare-before-reference: no transform: function', (t) => {
    t.noTransform('function');
    t.end();
});

test('plugin-declare-before-reference: no transform: scopes', (t) => {
    t.noTransform('scopes');
    t.end();
});

test('plugin-declare-before-reference: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('plugin-declare-before-reference: no transform: same-line', (t) => {
    t.noTransform('same-line');
    t.end();
});

test('plugin-declare-before-reference: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});

test('plugin-declare-before-reference: no transform: export-type', (t) => {
    t.noTransform('export-type');
    t.end();
});

test('plugin-declare-before-reference: no transform: require', (t) => {
    t.noTransform('require');
    t.end();
});

test('plugin-declare-before-reference: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-declare-before-reference: no report: different-scopes', (t) => {
    t.noReport('different-scopes');
    t.end();
});

test('plugin-declare-before-reference: no report: apply-types', (t) => {
    t.noReportAfterTransform('apply-types', {
        'apply-types': printer.rules['apply-types'],
        'declare-before-reference': declare,
        'remove-nested-blocks': removeNestedBlocks,
    });
    t.end();
});

test('plugin-nodejs: group-require-by-id: no report after transform: group-require-by-id', (t) => {
    t.noReportAfterTransform('group-require-by-id', {
        'group-require-by-id': nodejs.rules['group-require-by-id'],
        'reuse-duplicate-init': reuseDuplicateInit,
    });
    t.end();
});

test('plugin-declare-before-reference: transform: convert-traverse-to-scan', (t) => {
    t.transform('convert-traverse-to-scan', {
        'convert-esm-to-commonjs': nodejs.rules['convert-esm-to-commonjs'],
        'putout/declare': putout.rules.declare,
    });
    t.end();
});

test('plugin-declare-before-reference: transform: add-t-end', (t) => {
    t.transform('add-t-end', {
        'add-t-end': addTEnd,
    });
    t.end();
});

test('plugin-declare-before-reference: no report: cross-reference', (t) => {
    t.noReport('cross-reference');
    t.end();
});

test('plugin-declare-before-reference: transform: remove-useless-variables', (t) => {
    t.transform('remove-useless-variables', {
        'remove': removeUselessVariables.rules.remove,
        'remove-useless-arguments': removeUselessArguments,
    });
    t.end();
});
