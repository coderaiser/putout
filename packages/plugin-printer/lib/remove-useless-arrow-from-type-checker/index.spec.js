import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-arrow-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-arrow-from-type-checker: report', (t) => {
    t.report('remove-useless-arrow-from-type-checker', `Remove useless arrow: '+: parentPath -> -> ArrayExpression' -> '+: parentPath -> ArrayExpression'`);
    t.end();
});

test('printer: remove-useless-arrow-from-type-checker: transform', (t) => {
    t.transform('remove-useless-arrow-from-type-checker');
    t.end();
});
