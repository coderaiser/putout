import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-namaspace-specifier', plugin],
    ],
});

test('packages: apply-namaspace-specifier: report', (t) => {
    t.report('apply-namaspace-specifier', `Use 'import * as plugin' instead of 'import plugin'`);
    t.end();
});

test('packages: apply-namaspace-specifier: transform', (t) => {
    t.transform('apply-namaspace-specifier');
    t.end();
});

test('packages: apply-namaspace-specifier: no transform: rules', (t) => {
    t.noTransform('rules');
    t.end();
});

test('packages: apply-namaspace-specifier: no transform: rules-couple', (t) => {
    t.noTransform('rules-couple');
    t.end();
});

test('packages: apply-namaspace-specifier: no transform: create-test', (t) => {
    t.noTransform('create-test');
    t.end();
});

test('packages: apply-namaspace-specifier: transform: external', (t) => {
    t.transform('external');
    t.end();
});

test('packages: apply-namaspace-specifier: transform: alot', (t) => {
    t.transform('alot');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: no-spec', (t) => {
    t.noReport('no-spec');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: parent', (t) => {
    t.noReport('parent');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: internal', (t) => {
    t.noReport('internal');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: dot', (t) => {
    t.noReport('dot');
    t.end();
});
