import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['remove-keys', plugin],
    ],
});

test('putout: package-json: remove-exports-with-missing-files: remove-keys: report', (t) => {
    t.report('remove-keys', `./loader -> ./lib/loader.mjs`);
    t.end();
});

test('putout: package-json: remove-exports-with-missing-files: remove-keys: transform', (t) => {
    t.transform('remove-keys');
    t.end();
});
