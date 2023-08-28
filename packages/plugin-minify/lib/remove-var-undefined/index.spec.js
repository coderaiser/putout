import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['remove-var-undefined', plugin],
    ],
});

test('plugin-minify: remove-var-undefined: report', (t) => {
    t.report('remove-var-undefined', `Avoid using 'undefined' in variable declaration`);
    t.end();
});

test('plugin-minify: remove-var-undefined: transform', (t) => {
    t.transform('remove-var-undefined');
    t.end();
});
