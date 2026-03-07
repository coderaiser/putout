import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-spaces-to-type-checker', plugin],
    ],
});

test('printer: add-missing-spaces-to-type-checker: report', (t) => {
    t.report('add-missing-spaces-to-type-checker', `Add missing spaces: '-:->!' -> '-: -> !'`);
    t.end();
});

test('printer: add-missing-spaces-to-type-checker: transform', (t) => {
    t.transform('add-missing-spaces-to-type-checker');
    t.end();
});
