import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-exports-nesting', plugin],
    ],
});

test('package-json: remove-exports-nesting: report', (t) => {
    t.report('remove-exports-nesting', `Avoid nesting 'exports' with single field`);
    t.end();
});

test('package-json: remove-exports-nesting: transform', (t) => {
    t.transform('remove-exports-nesting');
    t.end();
});

test('package-json: remove-exports-nesting: no report: no-object', (t) => {
    t.noReport('no-object');
    t.end();
});
