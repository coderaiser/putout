import {createTest} from '@putout/test';
import * as removeUselessContinue from '../lib/remove-useless-continue.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-continue', removeUselessContinue],
    ],
});

test('plugin-remove-useless-continue: report: continue', (t) => {
    t.report('continue', `Avoid useless 'continue'`);
    t.end();
});

test('plugin-remove-useless-continue: no report: if', (t) => {
    t.noReport('if');
    t.end();
});

test('plugin-remove-useless-continue: transform: continue', (t) => {
    t.transform('continue');
    t.end();
});

test('plugin-remove-useless-continue: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-useless-continue: no transform: no-continue', (t) => {
    t.noTransform('no-continue');
    t.end();
});
