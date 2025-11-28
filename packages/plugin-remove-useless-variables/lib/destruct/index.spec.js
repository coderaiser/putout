import {createTest} from '@putout/test';
import * as destruct from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-variables/destruct', destruct],
    ],
});

test('remove-useless-variables: destruct: report', (t) => {
    t.report('destruct', `Remove useless variable 'args'`);
    t.end();
});

test('remove-useless-variables: destruct: transform', (t) => {
    t.transform('destruct');
    t.end();
});

test('remove-useless-variables: destruct: no transform: references', (t) => {
    t.noTransform('references');
    t.end();
});

test('remove-useless-variables: destruct: no transform: not-first', (t) => {
    t.noTransform('not-first');
    t.end();
});

test('remove-useless-variables: destruct: no transform: not-one', (t) => {
    t.noTransform('not-one');
    t.end();
});

test('remove-useless-variables: destruct: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('remove-useless-variables: destruct: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('remove-useless-variables: destruct: no report: types', (t) => {
    t.noReport('types');
    t.end();
});
