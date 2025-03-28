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

test('packages: apply-namaspace-specifier: transform: rules', (t) => {
    t.transform('rules');
    t.end();
});

test('packages: apply-namaspace-specifier: transform: rules-couple', (t) => {
    t.transform('rules-couple');
    t.end();
});

test('packages: apply-namaspace-specifier: transform: create-test', (t) => {
    t.transform('create-test');
    t.end();
});

test('packages: apply-namaspace-specifier: transform: external', (t) => {
    t.transform('external');
    t.end();
});

test('packages: apply-namaspace-specifier: transform: parent', (t) => {
    t.transform('parent');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: alot', (t) => {
    t.noReport('alot');
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
