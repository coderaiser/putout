import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-empty-type-literal-to-record', plugin],
    ],
});

test('typescript: convert-empty-type-literal-to-record: report', (t) => {
    t.report('convert-empty-type-literal-to-record', `Use 'Record<PropertyKey, never>' instead of '{}'`);
    t.end();
});

test('typescript: convert-empty-type-literal-to-record: transform', (t) => {
    t.transform('convert-empty-type-literal-to-record');
    t.end();
});
