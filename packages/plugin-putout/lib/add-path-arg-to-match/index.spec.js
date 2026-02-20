import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-path-arg-to-match', plugin],
    ],
});

test('putout: add-path-arg-to-match: report', (t) => {
    t.report('add-path-arg-to-match', `Argument 'path' is missing`);
    t.end();
});

test('putout: add-path-arg-to-match: transform', (t) => {
    t.transform('add-path-arg-to-match');
    t.end();
});

test('putout: add-path-arg-to-match: no report: includer', (t) => {
    t.noReport('includer');
    t.end();
});
