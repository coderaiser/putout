'use strict';

const {createTest} = require('@putout/test');
const nextjs = require('..');
const test = createTest(__dirname, {
    nextjs,
});

test('plugin-nextjs: transform: remove-a-from-link', (t) => {
    t.transform('remove-a-from-link');
    t.end();
});

