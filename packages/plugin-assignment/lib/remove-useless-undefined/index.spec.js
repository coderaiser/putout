import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-undefined', plugin],
    ],
});

test('assignment: remove-useless-undefined: report', (t) => {
    t.report('remove-useless-undefined', `Avoid useless 'undefined' in assignment pattern object`);
    t.end();
});

test('assignment: remove-useless-undefined: transform', (t) => {
    t.transform('remove-useless-undefined');
    t.end();
});

test('assignment: remove-useless-undefined: no report: not-assign', (t) => {
    t.noReport('not-assign');
    t.end();
});
