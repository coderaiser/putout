import {createTest} from '@putout/test';
import * as convertLintLib from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-lint-lib', convertLintLib],
    ],
});

test('madrun: convert lint:lib: report: lint', (t) => {
    t.report('lint', `'lint' should be used instead of 'lint:lib'`);
    t.end();
});

test('madrun: convert: lint: lib: transform', (t) => {
    t.transform('lint');
    t.end();
});
