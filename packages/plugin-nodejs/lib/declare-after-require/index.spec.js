import {operator} from 'putout';
import {createTest} from '@putout/test';
import * as putout from '@putout/plugin-putout';
import * as declare from '../declare/index.js';
import * as convertEsmToCommonjs from '../convert-esm-to-commonjs/index.js';
import * as convertCommonjsToEsm from '../convert-commonjs-to-esm.js';
import * as plugin from './index.js';

const noop = () => {};

const {remove} = operator;

const test = createTest(import.meta.url, {
    plugins: [
        ['declare-after-require', plugin],
    ],
});

test('plugin-nodejs: declare-after-require: report: require', (t) => {
    t.report('require', `Declare 'isObject' after last 'require()'`);
    t.end();
});

test('plugin-nodejs: declare-after-require: report: destructuring', (t) => {
    t.report('destructuring', `Declare '{compare}' after last 'require()'`);
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: destructuring-require', (t) => {
    t.transform('destructuring-require', {
        convertCommonjsToEsm,
    });
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-nodejs: declare-after-require: no report: no-require', (t) => {
    t.noReport('no-require');
    t.end();
});

test('plugin-nodejs: declare-after-require: no report: create-require', (t) => {
    t.noReport('create-require');
    t.end();
});

test('plugin-nodejs: declare-after-require: no report after transform: require', (t) => {
    t.noReportAfterTransform('require');
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: no-loc', (t) => {
    t.transform('no-loc', {
        declare,
        convertEsmToCommonjs,
    });
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: putout', (t) => {
    t.transform('putout', {
        putout,
        convertEsmToCommonjs,
    });
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: reference', (t) => {
    t.transform('reference');
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('plugin-nodejs: declare-after-require: no transform: call', (t) => {
    t.noTransform('call');
    t.end();
});

test('plugin-nodejs: declare-after-require: no report: expression', (t) => {
    t.noReport('expression');
    t.end();
});

test('plugin-nodejs: declare-after-require: transform: removed', (t) => {
    t.transform('removed', {
        remove: {
            report: noop,
            include: () => ['const a = 5'],
            fix: remove,
        },
    });
    t.end();
});
