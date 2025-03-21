import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-rename', plugin],
    ],
});

test('packages: apply-rename: report', (t) => {
    t.report('apply-rename', `Use 'rename(path, from, to)' instead of 'path.scope.rename(from, to)'`);
    t.end();
});

test('packages: apply-rename: transform', (t) => {
    t.transform('apply-rename');
    t.end();
});
