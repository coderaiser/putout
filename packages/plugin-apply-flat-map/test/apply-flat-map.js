'use strict';

const {createTest} = require('@putout/test');
const applyFlatMap = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['apply-flat-map', applyFlatMap],
    ],
});

test('plugin-apply-flat-map: report', (t) => {
    t.report('map', `Use '.flatMap()' instead of '.map().flat()'`);
    t.end();
});

test('plugin-apply-flat-map: transform: instanceof', (t) => {
    t.transform('map');
    t.end();
});
