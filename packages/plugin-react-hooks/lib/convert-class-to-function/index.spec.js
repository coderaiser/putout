'use strict';

const {createTest} = require('@putout/test');
const convertClassToFunction = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-class-to-function', convertClassToFunction],
    ],
});

test('plugin-react-hooks: convert-class-to-function: report: class', (t) => {
    t.report('class', 'class FormLoginContainer should be a function');
    t.end();
});

test('plugin-react-hooks: convert-class-to-function: transform: class', (t) => {
    t.transform('class');
    t.end();
});

test('plugin-react-hooks: convert-class-to-function: no transform: will-mount', (t) => {
    t.noTransform('will-mount');
    t.end();
});
