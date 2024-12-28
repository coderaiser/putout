'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['simplify-replace-template', plugin],
    ],
});

test('putout: simplify-replace-template: report', (t) => {
    t.report('simplify-replace-template', `Simplify replce template`);
    t.end();
});

test('putout: simplify-replace-template: transform', (t) => {
    t.transform('simplify-replace-template');
    t.end();
});
