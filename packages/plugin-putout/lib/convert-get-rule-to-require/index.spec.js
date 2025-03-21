import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-get-rule-to-require', plugin],
    ],
});

test('packages: convert-get-rule-to-require: report', (t) => {
    t.report('convert-get-rule-to-require', `Use top-level 'require()' instead of '...getRule()'`);
    t.end();
});

test('packages: convert-get-rule-to-require: transform', (t) => {
    t.transform('convert-get-rule-to-require');
    t.end();
});

test('packages: convert-get-rule-to-require: transform: kebab', (t) => {
    t.transform('kebab');
    t.end();
});

test('packages: convert-get-rule-to-require: transform: hulf', (t) => {
    t.transform('hulf');
    t.end();
});

test('packages: convert-get-rule-to-require: transform: off', (t) => {
    t.transform('off');
    t.end();
});

test('packages: convert-get-rule-to-require: no transform: no-spread', (t) => {
    t.noTransform('no-spread');
    t.end();
});
