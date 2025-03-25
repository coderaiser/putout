import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-plugins-array-to-object', plugin],
    ],
});

test('eslint: convert-plugins-array-to-object: report', (t) => {
    t.report('convert-plugins-array-to-object', `Convert 'plugins' array to object`);
    t.end();
});

test('eslint: convert-plugins-array-to-object: transform', (t) => {
    t.transform('convert-plugins-array-to-object');
    t.end();
});

test('eslint: convert-plugins-array-to-object: not report: call', (t) => {
    t.noReport('call');
    t.end();
});
