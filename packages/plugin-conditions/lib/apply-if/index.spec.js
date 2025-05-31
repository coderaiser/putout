import {createTest} from '@putout/test';
import * as applyIf from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['conditions/apply-if-condition', applyIf],
    ],
});

test('plugin-conditions: apply-if: report: if', (t) => {
    t.report('if', 'Avoid empty statement in if condition');
    t.end();
});

test('plugin-conditions: apply-if: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-conditions: apply-if: no transform: empty', (t) => {
    t.noTransform('empty');
    t.end();
});
