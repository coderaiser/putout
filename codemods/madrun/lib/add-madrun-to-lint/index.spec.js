import {createTest} from '@putout/test';
import * as addMadrunToLint from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-madrun-to-lint', addMadrunToLint],
    ],
});

test('madrun: add madrun to lint: report', (t) => {
    t.report('lint', '"lint" should check ".madrun.js"');
    t.end();
});

test('madrun: add madrun to lint: transform', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: add madrun to lint: transform: str', (t) => {
    t.transform('str');
    t.end();
});

test('madrun: add madrun to lint: transform: lib', (t) => {
    t.transform('lib');
    t.end();
});

test('madrun: add madrun to lint: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('madrun: add madrun to lint: no transform: exist .madrun.js', (t) => {
    t.noTransform('exist');
    t.end();
});

test('madrun: add madrun to lint: no transform: um', (t) => {
    t.noTransform('um');
    t.end();
});

test('madrun: add madrun to lint: no transform: um: um-template', (t) => {
    t.noTransform('um-template');
    t.end();
});

test('madrun: add madrun to lint: no transform: dot', (t) => {
    t.noTransform('dot');
    t.end();
});

test('madrun: add madrun to lint: no transform: dot: dot-template', (t) => {
    t.noTransform('dot-template');
    t.end();
});

test('madrun: add madrun to lint: no transform: glob', (t) => {
    t.noTransform('glob');
    t.end();
});

test('madrun: add madrun to lint: no transform: star', (t) => {
    t.noTransform('star');
    t.end();
});

test('madrun: add madrun to lint: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});
