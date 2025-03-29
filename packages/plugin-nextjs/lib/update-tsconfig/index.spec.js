import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['update-tsconfig', plugin],
    ],
});

test('packages: update-tsconfig: report', (t) => {
    t.report('update-tsconfig', `Update 'tsconfig.json'`);
    t.end();
});

test('packages: update-tsconfig: transform', (t) => {
    t.transform('update-tsconfig');
    t.end();
});
