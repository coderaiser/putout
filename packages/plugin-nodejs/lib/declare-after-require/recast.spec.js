'use strict';

const {createTest} = require('@putout/test');

const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['declare-after-require', plugin],
    ],
});

test('plugin-declare-after-require: transform: comments: recast', (t) => {
    t.transform('recast');
    t.end();
});
