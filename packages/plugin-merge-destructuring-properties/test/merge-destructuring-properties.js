import {createTest} from '@putout/test';
import {rules} from '@putout/plugin-putout';
import * as tape from '@putout/plugin-tape';
import * as putout from '@putout/plugin-putout';
import * as nodejs from '@putout/plugin-nodejs';
import * as convert from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as convertEsmToCommonjs from '@putout/plugin-nodejs/convert-esm-to-commonjs';
import * as declareBeforeReference from '@putout/plugin-declare-before-reference';
import * as mergeDestructuringProperties from '../lib/merge-destructuring-properties.js';

const {declare} = rules;

const test = createTest(import.meta.url, {
    'merge-destructuring-properties': mergeDestructuringProperties,
});

test('plugin-merge-destructuring-properties: report: object', (t) => {
    t.report('object', 'Merge object properties when destructuring');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: properties', (t) => {
    t.transform('properties');
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: vars', (t) => {
    t.noTransform('vars');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: quotes', (t) => {
    t.transform('quotes');
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: rest', (t) => {
    t.noTransform('rest');
    t.end();
});

test('plugin-merge-destructuring-properties: no report: no-init', (t) => {
    t.noReport('no-init');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-merge-destructuring-properties: no report: assignment-rest', (t) => {
    t.noReport('assignment-rest');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: putout-declare', (t) => {
    t.transform('putout-declare', {
        'putout/declare': declare,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: transform: minify', async (t) => {
    const minify = await import('@putout/plugin-minify');
    const declare = await import('@putout/plugin-declare');
    
    t.transform('minify', {
        declare,
        minify,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: transform: tape', (t) => {
    t.transform('tape', {
        'putout/tape': tape,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: transform: exports', (t) => {
    t.transform('exports', {
        'node/convert-commonjs-to-esm': convert,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: transform: putout-nodejs', (t) => {
    t.transform('putout-nodejs', {
        'putout/declare': putout.rules.declare,
        'nodejs/convert-esm-to-commonjs': convertEsmToCommonjs,
        'nodejs/group-require-by-id': nodejs.rules['group-require-by-id'],
    });
    t.end();
});

test('plugin-merge-destructuring-properties: transform: mock-require', (t) => {
    t.transform('mock-require', {
        'node/convert-commonjs-to-esm': convert,
        'tape/convert-mock-require-to-mock-import': tape.rules['convert-mock-require-to-mock-import'],
    });
    t.end();
});

test('plugin-merge-destructuring-properties: transform: declare-before-reference', (t) => {
    t.transform('declare-before-reference', {
        'declare-before-reference': declareBeforeReference,
    });
    t.end();
});
