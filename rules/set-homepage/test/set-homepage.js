import {createTest} from '@putout/test';
import * as setHomepage from '../lib/set-homepage.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-homepage', setHomepage],
    ],
});

test('rules: set-hompage: report: homepage', (t) => {
    t.report('homepage', 'Set homepage');
    t.end();
});

test('rules: set-hompeage: transform: homepage', (t) => {
    t.transform('homepage');
    t.end();
});

test('rules: set-hompeage: transform: different', (t) => {
    t.transform('different');
    t.end();
});

test('rules: set-hompeage: no report: no-name-homepage', (t) => {
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
