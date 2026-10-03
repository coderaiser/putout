import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-type-check-declaration', plugin],
    ],
});

test('putout: remove-useless-type-check-declaration: report', (t) => {
    t.report('remove-useless-type-check-declaration', `Avoid useless 'is-' declaration`);
    t.end();
});

test('putout: remove-useless-type-check-declaration: transform', (t) => {
    t.transform('remove-useless-type-check-declaration');
    t.end();
});

test('putout: remove-useless-type-check-declaration: no report: not-exists', (t) => {
    t.noReport('not-exists');
    t.end();
});
