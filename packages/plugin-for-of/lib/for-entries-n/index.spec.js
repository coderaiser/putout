import montag from 'montag';
import {createTest} from '@putout/test';
import * as entriesN from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-for-to-for-of/entries-n', entriesN],
    ],
});

test('plugin-convert-for-to-for-of: entries-n: report', (t) => {
    t.report('entries-n', `Use 'for...of' instead of 'for'`);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: no report: i-changed', (t) => {
    t.noReport('i-changed');
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: entries-n', (t) => {
    t.transform('entries-n');
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: no transform: used-n', (t) => {
    t.noTransform('used-n');
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: no report: not-declered-n', (t) => {
    t.noReport('not-declered-n');
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: not block', (t) => {
    t.noTransformCode(montag`
        const n = a.length;
        
        for (let i = 0; i < n; i++)
            log();\n
    `);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: not assign', (t) => {
    t.noTransformCode(montag`
        const n = a.length;
        for (let i = 0; i < n; i++) {}\n
    `);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: no n', (t) => {
    t.noTransformCode(montag`
        console.log();
        
        for (let i = 0; i < n; i++) {
            const element = elements[i];
        }\n
    `);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: no references i', (t) => {
    t.noTransformCode(montag`
        console.log();
        
        for (let i = 0; a < n; a++) {
            const element = elements[a];
        }\n
    `);
    t.end();
});
