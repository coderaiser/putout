import {createTest} from '@putout/test';
import * as applyEarlyReturn from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-else', applyEarlyReturn],
    ],
});

test('plugin-remove-useless-else: report: else', (t) => {
    t.report('else', `Avoid useless 'else'`);
    t.end();
});

test('plugin-remove-useless-else: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-remove-useless-else: transform: else-if', (t) => {
    t.transform('else-if');
    t.end();
});

test('plugin-remove-useless-else: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-useless-else: transform: continue', (t) => {
    t.transform('continue');
    t.end();
});

test('plugin-remove-useless-else: transform: break', (t) => {
    t.transform('break');
    t.end();
});

test('plugin-remove-useless-else: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});

test('plugin-remove-useless-else: transform: empty-body', (t) => {
    t.transform('empty-body');
    t.end();
});
