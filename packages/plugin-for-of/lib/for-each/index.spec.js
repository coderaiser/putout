import {createRequire} from 'node:module';
import {createTest} from '@putout/test';
import * as convertConstToLet from '@putout/plugin-convert-const-to-let';
import * as removeUselessContinue from '@putout/plugin-remove-useless-continue';
import * as plugin from './index.js';
import * as removeUselessVariables from '../remove-useless-variables/index.js';

const require = createRequire(import.meta.url);
const convertComparisonToBoolean = require('@putout/plugin-conditions').rules['convert-comparison-to-boolean'];

const test = createTest(import.meta.url, {
    plugins: [
        ['for-of/for-each', plugin],
    ],
});

test('plugin-for-of: report: keys', (t) => {
    t.report('keys', `Use 'for-of' instead of 'forEach()'`);
    t.end();
});

test('plugin-for-of: transform: keys', (t) => {
    t.transform('keys');
    t.end();
});

test('plugin-for-of: transform: this', (t) => {
    t.transform('this');
    t.end();
});

test('plugin-for-of: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-for-of: transform: empty-return', (t) => {
    t.transform('empty-return');
    t.end();
});

test('plugin-for-of: no transform: not-fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-for-of: no transform: empty-fn', (t) => {
    t.noTransform('empty-fn');
    t.end();
});

test('plugin-for-of: no transform: parent-fn-arg', (t) => {
    t.noTransform('parent-fn-arg');
    t.end();
});

test('plugin-for-of: no transform: not-this', (t) => {
    t.noTransform('not-this');
    t.end();
});

test('plugin-for-of: transform: not-bound', (t) => {
    t.transform('not-bound');
    t.end();
});

test('plugin-for-of: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-for-of: transform: member-expression', (t) => {
    t.transform('member-expression');
    t.end();
});

test('plugin-for-of: transform: inner-block', (t) => {
    t.transform('inner-block');
    t.end();
});

test('plugin-for-of: no transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

test('plugin-for-of: no transform: var-fn', (t) => {
    t.noTransform('var-fn');
    t.end();
});

test('plugin-for-of: no transform: if', (t) => {
    t.noTransform('if');
    t.end();
});

test('plugin-for-of: transform: i', (t) => {
    t.transform('i');
    t.end();
});

test('plugin-for-of: no transform: same-name', (t) => {
    t.noTransform('same-name');
    t.end();
});

test('plugin-for-of: transform: this-i', (t) => {
    t.transform('this-i');
    t.end();
});

test('plugin-for-of: transform: body-expression', (t) => {
    t.transform('body-expression');
    t.end();
});

test('plugin-for-of: no transform: couple', (t) => {
    t.noTransform('couple');
    t.end();
});

test('plugin-for-of: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});

test('plugin-for-of: no report: ternary', (t) => {
    t.noReport('ternary');
    t.end();
});

test('plugin-for-of: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-for-of: transform: end-return', (t) => {
    t.transform('end-return', {
        'remove-useless-continue': removeUselessContinue,
    });
    t.end();
});

test('plugin-for-of: transform: not-const', (t) => {
    t.transform('not-const', {
        convertConstToLet,
    });
    t.end();
});

test('plugin-for-of: transform: convert-comparison-to-boolean', (t) => {
    t.transform('convert-comparison-to-boolean', {
        'convert-comparison-to-boolean': convertComparisonToBoolean,
        'remove-useless-variables': removeUselessVariables,
    });
    t.end();
});
