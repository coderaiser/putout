'use strict';

const {createTest} = require('@putout/test');
const removeAFromLink = require('.');

const test = createTest(__dirname, {
    'convert-page-to-head': removeAFromLink,
});

test('plugin-nextjs: convert-page-to-head: report', (t) => {
    t.report('head', `Use 'Head' instead of 'Page'`);
    t.end();
});

test('plugin-nextjs: convert-page-to-head: transform', (t) => {
    t.transform('head');
    t.end();
});

test('plugin-nextjs: convert-page-to-head: no transform: no head', (t) => {
    t.noTransform('no-head');
    t.end();
});
