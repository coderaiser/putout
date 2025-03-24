import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-string-conversion', plugin],
    ],
});

test('packages: remove-useless-string-conversion: report', (t) => {
    t.report('remove-useless-string-conversion', `Remove useless String conversion`);
    t.end();
});

test('packages: remove-useless-string-conversion: transform', (t) => {
    t.transform('remove-useless-string-conversion');
    t.end();
});
