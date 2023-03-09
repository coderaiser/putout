'use strict';

const {createTest} = require('@putout/test');
const types = require('..');

const test = createTest(__dirname, {
    types,
});

test('putout: plugin: types: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});

