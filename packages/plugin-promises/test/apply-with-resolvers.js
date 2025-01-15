'use strict';

const {createTest} = require('@putout/test');
const promises = require('..');

const test = createTest(__dirname, {
    rules: {
        'promises/apply-with-resolvers': 'on',
    },
    plugins: [
        ['promises', promises],
    ],
});

test('plugin-promises: transform: apply-with-resolvers: apply-with-resolvers-on', (t) => {
    t.transform('apply-with-resolvers-on');
    t.end();
});
