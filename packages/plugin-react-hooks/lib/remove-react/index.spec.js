'use strict';

const {createTest} = require('@putout/test');
const remove = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-react', remove],
    ],
});

test('plugin-react-hooks: remove-react: report', (t) => {
    t.report('remove-react', `Remove unused 'React' variable`);
    t.end();
});

test('plugin-react-hooks: remove-react: transform', (t) => {
    t.transform('remove-react', '\n');
    t.end();
});

test('plugin-react-hooks: remove-react: transform: star', (t) => {
    t.transform('star', '\n');
    t.end();
});

test('plugin-react-hooks: remove-react: no transform: used', (t) => {
    t.noTransform('used');
    t.end();
});

test('plugin-react-hooks: remove-react: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});
