import {createTest} from '@putout/test';
import * as optimize from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['regexp/apply-starts-with', optimize],
    ],
});

test('plugin-regexp/apply-starts-with: report: apply-starts-with', (t) => {
    t.report('apply-starts-with', `Use '.startsWith()' instead of '.test()'`);
    t.end();
});

test('plugin-regexp/apply-starts-with: transform: apply-starts-with', (t) => {
    t.transform('apply-starts-with');
    t.end();
});

test('plugin-regexp/apply-starts-with: transform: slash', (t) => {
    t.transform('slash');
    t.end();
});
