import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['remove-keys', plugin],
    ],
});

test('putout: package-json: remove-exports-with-missing-files: remove-keys: report', (t) => {
    t.reportWithOptions('remove-keys', `./loader -> ./lib/loader.mjs`, {
        keys: ['./loader'],
    });
    t.end();
});

test('putout: package-json: remove-exports-with-missing-files: remove-keys: transform', (t) => {
    t.transformWithOptions('remove-keys', {
        keys: ['./loader'],
    });
    t.end();
});
