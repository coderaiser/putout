'use strict';

const {createTest} = require('@putout/test');
const nextjs = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'nextjs/update-tsconfig': 'on',
    },
    plugins: [
        ['nextjs', nextjs],
    ],
});

test('plugin-nextjs: transform: update-tsconfig', (t) => {
    t.transform('update-tsconfig');
    t.end();
});
