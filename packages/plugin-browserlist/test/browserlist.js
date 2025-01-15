'use strict';

const {createTest} = require('@putout/test');
const browserilist = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['browserilist', browserilist],
    ],
});

test('plugin-putout: transform: browserlist', (t) => {
    t.transform('browserlist');
    t.end();
});
