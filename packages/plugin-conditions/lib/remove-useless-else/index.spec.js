'use strict';

const {createTest} = require('@putout/test');
const applyEarlyReturn = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-else', applyEarlyReturn],
    ],
});

test('plugin-remove-useless-else: report', (t) => {
    t.report('else', `Avoid useless 'else'`);
    t.end();
});

test('plugin-remove-useless-else: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-remove-useless-else: transform: else-if', (t) => {
    t.transform('else-if');
    t.end();
});

test('plugin-remove-useless-else: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-useless-else: transform: continue', (t) => {
    t.transform('continue');
    t.end();
});

test('plugin-remove-useless-else: transform: break', (t) => {
    t.transform('break');
    t.end();
});

test('plugin-remove-useless-else: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});
