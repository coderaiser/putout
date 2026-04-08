import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-default-export-to-default', plugin],
    ],
});

test('nodejs: convert-default-export-to-default: report', (t) => {
    t.report('convert-default-export-to-default', `Use 'default' instead of 'defaultExport'`);
    t.end();
});

test('nodejs: convert-default-export-to-default: transform', (t) => {
    t.transform('convert-default-export-to-default');
    t.end();
});
