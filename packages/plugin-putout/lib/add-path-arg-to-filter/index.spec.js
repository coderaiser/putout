import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-path-arg-to-filter', plugin],
    ],
});

test('putout: add-path-arg-to-filter: report', (t) => {
    t.report('add-path-arg-to-filter', `Argument 'path' is missing`);
    t.end();
});

test('putout: add-path-arg-to-filter: transform', (t) => {
    t.transform('add-path-arg-to-filter');
    t.end();
});

test('putout: add-path-arg-to-filter: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('putout: add-path-arg-to-filter: transform: no-body', (t) => {
    t.transform('no-body');
    t.end();
});
