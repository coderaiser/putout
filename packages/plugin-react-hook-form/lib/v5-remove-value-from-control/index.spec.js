import {createTest} from '@putout/test';
import * as removeValueFromControl from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-value-from-control', removeValueFromControl],
    ],
});

test('plugin-nextjs: remove-value-from-control: report', (t) => {
    t.report('remove-value-from-control', `Remove 'value property' from 'control' attribute`);
    t.end();
});

test('plugin-nextjs: remove-value-from-control: transform', (t) => {
    t.transform('remove-value-from-control');
    t.end();
});
