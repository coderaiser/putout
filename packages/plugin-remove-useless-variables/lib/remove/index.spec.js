'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-variables/remove': require('.'),
});

test('remove usless variables: remove: report', (t) => {
    t.report('require', 'Useless variable declaration with name "child_process"');
    t.end();
});

test('remove usless variables: remove: transform', (t) => {
    t.transform('require');
    t.end();
});

test('remove usless variables: remove: no transform: react', (t) => {
    t.noTransform('react');
    t.end();
});
