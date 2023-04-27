'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['printer/apply-linebreak', plugin],
    ],
});

test('rule: apply-linebreak: report', (t) => {
    t.report('apply-linebreak', `linebreak = indent + newline`);
    t.end();
});

test('rule: apply-linebreak: transform', (t) => {
    t.transform('apply-linebreak');
    t.end();
});

test('rule: apply-linebreak: transform: indent', (t) => {
    t.transform('indent');
    t.end();
});

test('rule: apply-linebreak: transform: write', (t) => {
    t.transform('write');
    t.end();
});
