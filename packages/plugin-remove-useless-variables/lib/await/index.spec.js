'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');
const test = createTest(__dirname, {
    'remove-useless-variables/await': plugin,
});

test('remove usless variables: await: report', (t) => {
    t.report('await', 'Promise.resolve has no sense in async function');
    t.end();
});

test('remove usless variables: await: transform', (t) => {
    t.transform('await');
    t.end();
});

test('remove usless variables: await: no transform: no var', (t) => {
    t.noTransform('no-var');
    t.end();
});

test('remove usless variables: await: no transform: no call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('remove usless variables: await: no transform: no member', (t) => {
    t.noTransform('no-member');
    t.end();
});

test('remove usless variables: await: no transform: no resolve', (t) => {
    t.noTransform('no-resolve');
    t.end();
});

