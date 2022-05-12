'use strict';

const {createTest} = require('@putout/test');
const removeNyc = require('.');

const test = createTest(__dirname, {
    'package-json/remove-nyc': removeNyc,
});

test('putout: plugin-package-json: remove-nyc: report', (t) => {
    t.report('nyc', `Remove 'nyc' section of 'package.json', use file '.nycrc.json' instead`);
    t.end();
});

test('putout: plugin-package-json: remove-nyc: transform', (t) => {
    t.transform('nyc');
    t.end();
});

test('putout: plugin-package-json: remove-nyc: no nyc', (t) => {
    t.noTransform('no-nyc');
    t.end();
});

