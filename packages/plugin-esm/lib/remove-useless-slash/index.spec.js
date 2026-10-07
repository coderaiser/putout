import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-slash', plugin],
    ],
});

test('esm: remove-useless-slash: report', (t) => {
    t.report('remove-useless-slash', `Avoid useless "/" in import source`);
    t.end();
});

test('esm: remove-useless-slash: transform', (t) => {
    t.transform('remove-useless-slash');
    t.end();
});
