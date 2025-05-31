import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-arrow-to-condition', plugin],
    ],
});

test('conditions: convert-arrow-to-condition: report', (t) => {
    t.report('convert-arrow-to-condition', `Use 'condition' instead of 'arrow function'`);
    t.end();
});

test('conditions: convert-arrow-to-condition: transform', (t) => {
    t.transform('convert-arrow-to-condition');
    t.end();
});
