import {createTest} from '@putout/test';
import * as convertAssignmentToComparison from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['assignment/convert-to-comparison', convertAssignmentToComparison],
    ],
});

test('plugin-assignment: convert-to-comparison: report: assignment', (t) => {
    t.report('assignment', 'Expected comparison instead of assignment');
    t.end();
});

test('plugin-assignment: convert-to-comparison: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});
