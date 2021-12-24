'use strict';

const {createTest} = require('@putout/test');
const setHomepage = require('..');
const test = createTest(__dirname, {
    'add-readme-to-homepage': setHomepage,
});

test('rules: add-readme-to-homepage: report', (t) => {
    t.report('homepage', `Add anchor '#readme' to 'homepage' in package.json`);
    t.end();
});

test('rules: add-readme-to-homepage: transform', (t) => {
    t.transform('homepage');
    t.end();
});

