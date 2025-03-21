import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['printer/apply-linebreak', plugin],
    ],
});

test('plugin-printer: apply-linebreak: report', (t) => {
    t.report('apply-linebreak', `linebreak = indent + newline`);
    t.end();
});

test('plugin-printer: apply-linebreak: transform', (t) => {
    t.transform('apply-linebreak');
    t.end();
});

test('plugin-printer: apply-linebreak: transform: indent', (t) => {
    t.transform('indent');
    t.end();
});

test('plugin-printer: apply-linebreak: transform: write', (t) => {
    t.transform('write');
    t.end();
});
