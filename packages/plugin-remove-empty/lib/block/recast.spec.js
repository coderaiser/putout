'use strict';

const {createTest} = require('@putout/test');
const removeEmptyBlock = require('.');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['remove-empty-block', removeEmptyBlock],
    ],
});

test('plugin-remove-empty: block: recast: recast-block-fn', (t) => {
    t.transform('recast-block-fn');
    t.end();
});
