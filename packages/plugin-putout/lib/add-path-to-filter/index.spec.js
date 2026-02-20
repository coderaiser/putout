import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-path-to-filter', plugin],
    ],
});

test('putout: add-path-to-filter: report', (t) => {
    t.report('add-path-to-filter', `Argument 'path' is missing`);
    t.end();
});

test('putout: add-path-to-filter: transform', (t) => {
    t.transform('add-path-to-filter');
    t.end();
});
