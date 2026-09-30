import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-match', plugin],
    ],
});

test('putout: remove-useless-match: report', (t) => {
    t.report('remove-useless-match', `Avoid useless 'match'`);
    t.end();
});

test('putout: remove-useless-match: transform', (t) => {
    t.transform('remove-useless-match');
    t.end();
});

test('putout: remove-useless-match: no report: not-true', (t) => {
    t.noReport('not-true');
    t.end();
});
