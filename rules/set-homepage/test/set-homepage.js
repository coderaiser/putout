import {createTest} from '@putout/test';
import * as setHomepage from '../lib/set-homepage.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-homepage', setHomepage],
    ],
});

test('rules: set-hompage: report', (t) => {
    t.report('homepage', 'Set homepage');
    t.end();
});

test('rules: set-hompeage: transform', (t) => {
    t.transform('homepage');
    t.end();
});

test('rules: set-hompeage: transform: different', (t) => {
    t.transform('different');
    t.end();
});

test('rules: set-hompeage: no report', (t) => {
    t.noReport('no-name-homepage');
    t.end();
});

test('rules: set-hompeage: no transform: codemod', (t) => {
    t.noTransform('codemod');
    t.end();
});

test('rules: set-hompeage: no transform: rule', (t) => {
    t.noTransform('rule');
    t.end();
});
