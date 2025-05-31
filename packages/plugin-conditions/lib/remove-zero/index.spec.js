import {createTest} from '@putout/test';
import removeBoolean from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['conditions/remove-zero', removeBoolean],
    ],
});

test('plugin-conditions: remove-zero: report', (t) => {
    t.report('remove-zero', `Avoid '0' in assertions`);
    t.end();
});

test('plugin-conditions: remove-zero: transform', (t) => {
    t.transform('remove-zero');
    t.end();
});

test('plugin-conditions: remove-zero: transform: parens', (t) => {
    t.transform('parens');
    t.end();
});

test('plugin-conditions: remove-zero: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-conditions: remove-zero: no transform: jsx', (t) => {
    t.noTransform('jsx');
    t.end();
});

test('plugin-conditions: remove-zero: no transform: jsx-equal', (t) => {
    t.noTransform('jsx-equal');
    t.end();
});
