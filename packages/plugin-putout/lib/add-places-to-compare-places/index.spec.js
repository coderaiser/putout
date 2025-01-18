'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-places-to-compare-places', plugin],
    ],
});

test('putout: add-places-to-compare-places: report: add-places-to-compare-places', (t) => {
    t.report('add-places-to-compare-places', `Add 'places' array to 'comparePlaces()'`);
    t.end();
});

test('putout: add-places-to-compare-places: transform: add-places-to-compare-places', (t) => {
    t.transform('add-places-to-compare-places');
    t.end();
});
