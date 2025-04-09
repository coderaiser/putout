import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['change-imports', plugin],
    ],
});

test('putout: esm: resolve-imported-file: report: change-imports', (t) => {
    t.report('change-imports', ``);
    t.end();
});

test('putout: esm: resolve-imported-file: transform: change-imports', (t) => {
    t.transform('change-imports');
    t.end();
});
