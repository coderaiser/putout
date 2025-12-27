import {createTest} from '@putout/test';
import * as removeUnusedVariables from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['variables/remove-unused', removeUnusedVariables],
    ],
});

test('putout: plugin-variables: remove-unused: report', (t) => {
    t.reportCode('const a = 5', `'a' is defined but never used`);
    t.end();
});

test('putout: plugin-variables: remove-unused: transform: array-pattern', (t) => {
    t.transform('array-pattern');
    t.end();
});
