import {createTest} from '@putout/test';
import * as removeBoolean from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['conditions/remove-boolean', removeBoolean],
    ],
});

test('plugin-conditions: remove-boolean: report: assertions', (t) => {
    t.report('assertions', 'Avoid boolean in assertions');
    t.end();
});

test('plugin-conditions: remove-boolean: transform: assertions', (t) => {
    t.transform('assertions');
    t.end();
});

test('plugin-conditions: remove-boolean: no transform: const', (t) => {
    t.noTransform('const');
    t.end();
});

test('plugin-conditions: remove-boolean: no transform: not-equal-false', (t) => {
    t.noTransform('not-equal-false');
    t.end();
});
