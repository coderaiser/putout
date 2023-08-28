import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['simplify-floor', plugin],
    ],
});

test('plugin-minify: simplify-floor: report', (t) => {
    t.report('simplify-floor', `Use '~~' instead of 'Math.floor()'`);
    t.end();
});

test('plugin-minify: simplify-floor: transform', (t) => {
    t.transform('simplify-floor');
    t.end();
});
