import {createTest} from '@putout/test';
import * as variables from '@putout/plugin-variables';
import * as tape from '@putout/plugin-tape';
import * as reuseDuplicateInit from '../lib/reuse-duplicate-init.js';

const convertTapeToSupertape = tape.rules['convert-tape-to-supertape'];
const applyDestructuring = tape.rules['apply-destructuring'];
const declareStub = tape.rules.declare;

const removeUselessVariables = variables.rules['remove-useless'];

const test = createTest(import.meta.url, {
    plugins: [
        ['reuse-duplicate-init', reuseDuplicateInit],
    ],
});

test('plugin-reuse-duplicate-init: report: init', (t) => {
    t.report('init', 'Reuse duplicate init');
    t.end();
});

test('plugin-reuse-duplicate-init: transform: init', (t) => {
    t.transform('init');
    t.end();
});

test('plugin-reuse-duplicate-init: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: no-main', (t) => {
    t.noTransform('no-main');
    t.end();
});

test('plugin-reuse-duplicate-init: no report: rest', (t) => {
    t.noReport('rest');
    t.end();
});

test('plugin-reuse-duplicate-init: transform: no-node', (t) => {
    t.transform('no-node', {
        'remove-useless-variables': removeUselessVariables,
    });
    t.end();
});

test('plugin-reuse-duplicate-init: transform: declare-stub', (t) => {
    t.transform('declare-stub', {
        'tape/declare': declareStub,
    });
    t.end();
});

test('plugin-reuse-duplicate-init: transform: overlap', (t) => {
    t.transform('overlap', {
        'tape/convert-tape-to-supertape': convertTapeToSupertape,
        'tape/apply-destructuring': applyDestructuring,
    });
    t.end();
});
