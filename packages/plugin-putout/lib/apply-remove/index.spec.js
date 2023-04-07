'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/apply-remove', convert],
    ],
});

test('plugin-tape: apply-remove: report', (t) => {
    t.report('apply-remove', `Use 'remove(path)' instead of 'path.remove()'`);
    t.end();
});

test('plugin-tape: apply-remove', (t) => {
    t.transform('apply-remove');
    t.end();
});
