import {createTest} from '@putout/test';
import * as plugin from '../lib/remove-useless-delete.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-delete', plugin],
    ],
});

test('putout: remove-useless-delete: report', (t) => {
    t.report('remove-useless-delete', `Avoid useless 'delete'`);
    t.end();
});

test('putout: remove-useless-delete: transform', (t) => {
    t.transform('remove-useless-delete');
    t.end();
});

test('putout: remove-useless-delete: no report: optional-chaining', (t) => {
    t.noReport('optional-chaining');
    t.end();
});
