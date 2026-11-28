import {createTest} from '@putout/test';
import * as webpack from '@putout/plugin-webpack';
import * as applyNumericSeparators from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['math/apply-numeric-separators', applyNumericSeparators],
    ],
});

test('plugin-math: apply-numeric-separators: report: number', (t) => {
    t.report('number', `Use numeric separators: '10000000' -> '10_000_000'`);
    t.end();
});

test('plugin-math: apply-numeric-separators: transform: number', (t) => {
    t.transform('number');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: sep', (t) => {
    t.noTransform('sep');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: min', (t) => {
    t.noTransform('min');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: min', (t) => {
    t.noReport('min');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: hex', (t) => {
    t.noTransform('hex');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: e', (t) => {
    t.noReport('e');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: octal', (t) => {
    t.noReport('octal');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: binary', (t) => {
    t.noReport('binary');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: hex-uppercase', (t) => {
    t.noReport('hex-uppercase');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: not-integer', (t) => {
    t.noReport('not-integer');
    t.end();
});

test('plugin-math: apply-numeric-separators: transform: webpack', (t) => {
    t.transform('webpack', {
        webpack,
    });
    t.end();
});

test('plugin-math: apply-numeric-separators: report: hex-long', (t) => {
    t.report('hex-long', `Use numeric separators: '0xDEADBEEF' -> '0xDEAD_BEEF'`);
    t.end();
});

test('plugin-math: apply-numeric-separators: transform: hex-long', (t) => {
    t.transform('hex-long');
    t.end();
});

test('plugin-math: apply-numeric-separators: report: binary-long', (t) => {
    t.report('binary-long', `Use numeric separators: '0b11110000111100001111000011110000' -> '0b1111_0000_1111_0000_1111_0000_1111_0000'`);
    t.end();
});

test('plugin-math: apply-numeric-separators: transform: binary-long', (t) => {
    t.transform('binary-long');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: binary', (t) => {
    t.noTransform('binary');
    t.end();
});

test('plugin-math: apply-numeric-separators: report: octal-long', (t) => {
    t.report('octal-long', `Use numeric separators: '0o777123456' -> '0o777_123_456'`);
    t.end();
});

test('plugin-math: apply-numeric-separators: transform: octal-long', (t) => {
    t.transform('octal-long');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: octal-short', (t) => {
    t.noTransform('octal-short');
    t.end();
});
