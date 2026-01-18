import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-imports-nesting', plugin],
    ],
});

test('package-json: remove-imports-nesting: report', (t) => {
    t.report('remove-imports-nesting', `Avoid nesting import '#get-imports' with single property: 'default'`);
    t.end();
});

test('package-json: remove-imports-nesting: transform', (t) => {
    t.transform('remove-imports-nesting');
    t.end();
});
