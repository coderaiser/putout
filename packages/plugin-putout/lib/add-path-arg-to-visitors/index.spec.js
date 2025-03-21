import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-path-arg-to-visitors', plugin],
    ],
});

test('putout: add-path-arg-to-visitors: report: add-path-arg-to-visitors', (t) => {
    t.report('add-path-arg-to-visitors', `Add 'path' argument to 'traverse' visitors`);
    t.end();
});

test('putout: add-path-arg-to-visitors: transform: add-path-arg-to-visitors', (t) => {
    t.transform('add-path-arg-to-visitors');
    t.end();
});

test('putout: add-path-arg-to-visitors: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('putout: add-path-arg-to-visitors: no report: not-referenced', (t) => {
    t.noReport('not-referenced');
    t.end();
});
