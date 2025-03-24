import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['assignment/split', plugin],
    ],
});

test('putout: plugin-assignment: split: report', (t) => {
    t.report('split', `Split assignment expressions`);
    t.end();
});

test('putout: plugin-assignment: split: transform: string', (t) => {
    t.transform('string');
    t.end();
});

test('putout: plugin-assignment: split: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('putout: plugin-assignment: split: transform', (t) => {
    t.transform('split');
    t.end();
});

test('putout: plugin-assignment: split: transform: separate', (t) => {
    t.transform('separate');
    t.end();
});
