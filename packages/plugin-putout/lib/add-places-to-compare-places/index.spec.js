'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-places-to-compare-places', plugin],
    ],
});

test('putout: add-places-to-compare-places: report', (t) => {
    t.report('add-places-to-compare-places', `Add 'places' array to 'comparePlaces()'`);
    t.end();
});

test('putout: add-places-to-compare-places: transform', (t) => {
    t.transform('add-places-to-compare-places');
    t.end();
});
