'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['eslint-plugin/apply-filename', plugin],
    ],
});

test('putout: plugin-eslint: apply-filename: report', (t) => {
    t.report('apply-filename', `Use 'context.filename' instead of 'context.getFilename()'`);
    t.end();
});

test('putout: plugin-eslint: apply-filename: transform', (t) => {
    t.transform('apply-filename');
    t.end();
});
