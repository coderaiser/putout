import {createTest} from '@putout/test';
import * as removeUselessRegexp from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['regexp/remove-useless-regexp', removeUselessRegexp],
    ],
});

test('plugin-regexp/remove-useless-regexp: report: regexp', (t) => {
    t.report('regexp', 'Remove useless RegExp, use strict equal operator instead');
    t.end();
});

test('plugin-regexp/remove-useless-regexp: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp/remove-useless-regexp: transform: couple-chars', (t) => {
    t.transform('couple-chars');
    t.end();
});

test('plugin-regexp/remove-useless-regexp: no transform: hard', (t) => {
    t.noTransform('hard');
    t.end();
});

test('plugin-regexp/remove-useless-regexp: no transform: decimal', (t) => {
    t.noTransform('decimal');
    t.end();
});
