import {createTest} from '@putout/test';
import * as removeDebugger from '../lib/remove-debugger.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-debugger', removeDebugger],
    ],
});

test('remove debugger: report', (t) => {
    t.reportCode('debugger', `Unexpected 'debugger' statement`);
    t.end();
});

test('remove debugger: transformCode', (t) => {
    t.transformCode('debugger', '\n');
    t.end();
});
