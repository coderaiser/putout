import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['reverse-condition', plugin],
    ],
});

test('conditions: reverse-condition: report', (t) => {
    t.report('reverse-condition', `Avoid useless '!'`);
    t.end();
});

test('conditions: reverse-condition: transform', (t) => {
    t.transform('reverse-condition');
    t.end();
});

test('conditions: reverse-condition: transform: and', (t) => {
    t.transform('and');
    t.end();
});

test('conditions: reverse-condition: transform: or', (t) => {
    t.transform('or');
    t.end();
});

test('conditions: reverse-condition: transform: not-or', (t) => {
    t.transform('not-or');
    t.end();
});

test('conditions: reverse-condition: transform: less-equal', (t) => {
    t.transform('less-equal');
    t.end();
});

test('conditions: reverse-condition: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});
