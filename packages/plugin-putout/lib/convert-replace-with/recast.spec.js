'use strict';

const {createTest} = require('@putout/test');
const convertReplaceWith = require('.');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['putout/convert-replace-with', convertReplaceWith],
    ],
});

test('plugin-putout: convert-replace-with: recast: transform', (t) => {
    t.transform('recast-replace-with');
    t.end();
});
