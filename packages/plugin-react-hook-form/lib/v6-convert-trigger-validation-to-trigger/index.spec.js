import {createTest} from '@putout/test';
import * as convertAsToRender from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-trigger-validation-to-trigger', convertAsToRender],
    ],
});

test('plugin-nextjs: convert-trigger-validation-to-trigger: report', (t) => {
    t.report('convert-trigger-validation-to-trigger', `Use 'trigger()' instead of 'triggerValidation()'`);
    t.end();
});

test('plugin-nextjs: convert-trigger-validation-to-trigger: no report: no-trigger-validation', (t) => {
    t.noReport('no-trigger-validation');
    t.end();
});

test('plugin-nextjs: convert-trigger-validation-to-trigger: transform', (t) => {
    t.transform('convert-trigger-validation-to-trigger');
    t.end();
});
