import {createTest} from '@putout/test';
import * as simplify from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['conditions/simplify', simplify],
    ],
});

test('plugin-conditions: simplify: report: conditions', (t) => {
    t.report('conditions', 'Avoid useless conditions');
    t.end();
});

test('plugin-conditions: simplify: transform: conditions', (t) => {
    t.transform('conditions');
    t.end();
});

test('plugin-conditions: simplify: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});
