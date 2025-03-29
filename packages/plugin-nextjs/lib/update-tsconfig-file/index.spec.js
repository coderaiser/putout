import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['update-tsconfig-file', plugin],
    ],
});

test('packages: update-tsconfig-file: report', (t) => {
    t.report('update-tsconfig-file', `Update 'tsconfig.json'`);
    t.end();
});

test('packages: update-tsconfig-file: transform', (t) => {
    t.transform('update-tsconfig-file');
    t.end();
});
