'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['nodejs/convert-url-to-dirname', convert],
    ],
});

test('nodejs: convert-url-to-dirname: report: common', (t) => {
    t.report('common', `Use __dirname instead of 'import.meta.url' in CommonJS`);
    t.end();
});

test('nodejs: convert-url-to-dirname: transform: common', (t) => {
    t.transform('common');
    t.end();
});
