'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['minify/inline', plugin],
    ],
});

test('plugin-minify: inline: report', (t) => {
    t.report('inline', `Inline expressions`);
    t.end();
});

test('plugin-minify: inline: transform', (t) => {
    t.transform('inline');
    t.end();
});

test('plugin-minify: inline: no transform: both-expressions', (t) => {
    t.noTransform('both-expressions');
    t.end();
});
