'use strict';

const {createTest} = require('@putout/test');
const browserilist = require('..');

const test = createTest(__dirname, {
    browserilist,
});

test('plugin-putout: transform: node', (t) => {
    t.transform('browserlist');
    t.end();
});

