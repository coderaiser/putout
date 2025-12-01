import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['destructuring/remove-useless-variables', plugin],
    ],
});

test('putout: plugin-destructuring: remove-useless-variables: report: destruct', (t) => {
    t.report('destruct', `Avoid useless variable 'args'`);
    t.end();
});

test('putout: plugin-destructuring: remove-useless-variables: transform: destruct', (t) => {
    t.transform('destruct');
    t.end();
});

test('putout: plugin-destructuring: remove-useless-variables: no transform: references', (t) => {
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
