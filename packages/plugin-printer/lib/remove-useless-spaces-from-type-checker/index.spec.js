import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-spaces-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-spaces-from-type-checker: report', (t) => {
    t.report('remove-useless-spaces-from-type-checker', `Remove useless spaces: '- : -> !' -> '-: -> !'`);
    t.end();
});

test('printer: remove-useless-spaces-from-type-checker: transform', (t) => {
    t.transform('remove-useless-spaces-from-type-checker');
    t.end();
});
