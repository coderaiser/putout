import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-trailing-spaces-from-type-checker', plugin],
    ],
});

test('printer: remove-trailing-spaces-from-type-checker: report', (t) => {
    t.report('remove-trailing-spaces-from-type-checker', `Avoid trailing spaces: '-: parentPath -> ' -> '-: parentPath ->'`);
    t.end();
});

test('printer: remove-trailing-spaces-from-type-checker: transform', (t) => {
    t.transform('remove-trailing-spaces-from-type-checker');
    t.end();
});
