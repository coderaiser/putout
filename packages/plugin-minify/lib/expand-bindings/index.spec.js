'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['expand-bindings', plugin],
    ],
});

test('plugin-minify: expand-bindings: report', (t) => {
    t.report('expand-bindings', `Expand bindings`);
    t.end();
});

test('plugin-minify: expand-bindings: transform', (t) => {
    t.transform('expand-bindings');
    t.end();
});
