import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-logical', plugin],
    ],
});

test('spread: remove-useless-logical: report', (t) => {
    t.report('remove-useless-logical', `Avoid useless 'logical expression' in spread`);
    t.end();
});

test('spread: remove-useless-logical: transform', (t) => {
    t.transform('remove-useless-logical');
    t.end();
});

test('spread: remove-useless-logical: no report: not-object', (t) => {
    t.noReport('not-object');
    t.end();
});

test('spread: remove-useless-logical: no report: not-empty-object', (t) => {
    t.noReport('not-empty-object');
    t.end();
});
