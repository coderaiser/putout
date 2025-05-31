import {createTest} from '@putout/test';
import * as convertEqualToStrictEqual from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['conditions/convert-equal-to-strict-equal', convertEqualToStrictEqual],
    ],
});

test('plugin-conditions: convert-equal-to-strict-equal: report: equal', (t) => {
    t.report('equal', `Use strict equal ('===') instead of equal ('==')`);
    t.end();
});

test('plugin-conditions: convert-equal-to-strict-equal: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-conditions: convert-equal-to-strict-equal: no transform: null', (t) => {
    t.noTransform('null');
    t.end();
});

test('plugin-conditions: convert-equal-to-strict-equal: no transform: not-null', (t) => {
    t.noTransform('not-null');
    t.end();
});
