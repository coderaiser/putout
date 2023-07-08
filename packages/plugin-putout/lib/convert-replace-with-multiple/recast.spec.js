'use strict';

const {createTest} = require('@putout/test');
const replaceWithMultiple = require('.');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['putout/replace-with-multiple', replaceWithMultiple],
    ],
});

test('plugin-putout: replace-with-multiple: recast: transform', (t) => {
    t.transform('recast-replace-with-multiple');
    t.end();
});
