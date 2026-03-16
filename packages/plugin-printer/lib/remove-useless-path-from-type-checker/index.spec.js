import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-path-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-path-from-type-checker: report', (t) => {
    t.report('remove-useless-path-from-type-checker', `Avoid useless 'path': '-: path.parentPath' -> '-: parentPath'`);
    t.end();
});

test('printer: remove-useless-path-from-type-checker: transform', (t) => {
    t.transform('remove-useless-path-from-type-checker');
    t.end();
});
