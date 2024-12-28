import {createTest} from '@putout/test';
import * as setHomepage from '../lib/set-commit-type.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-commit-type', setHomepage],
    ],
});

test('rules: set-commit-type: report', (t) => {
    t.report('commit-type', `Set 'commitType'`);
    t.end();
});

test('rules: set-commit-type: transform', (t) => {
    t.transform('commit-type');
    t.end();
});

test('rules: set-commit-type: no report: no-main', (t) => {
    t.noReport('no-main');
    t.end();
});
