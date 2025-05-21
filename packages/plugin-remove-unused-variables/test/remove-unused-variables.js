import {createTest} from '@putout/test';
import * as removeDebugger from '../lib/remove-unused-variables.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-debugger', removeDebugger],
    ],
});

test('remove-unused-variables: report', (t) => {
    t.reportCode('const a = 5', `'a' is defined but never used`);
    t.end();
});
