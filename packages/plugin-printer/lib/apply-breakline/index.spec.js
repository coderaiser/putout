import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['printer/apply-breakline', plugin],
    ],
});

test('plugin-printer: apply-breakline: report', (t) => {
    t.report('apply-breakline', `breakline = newline + indent`);
    t.end();
});

test('plugin-printer: apply-breakline: transform', (t) => {
    t.transform('apply-breakline');
    t.end();
});

test('plugin-printer: apply-breakline: transform: indent', (t) => {
    t.transform('indent');
    t.end();
});

test('plugin-printer: apply-breakline: transform: write', (t) => {
    t.transform('write');
    t.end();
});
