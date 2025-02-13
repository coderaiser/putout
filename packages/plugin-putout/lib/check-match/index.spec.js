'use strict';

const {createTest} = require('@putout/test');
const checkReplaceCode = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/check-match', checkReplaceCode],
    ],
});

test('plugin-putout: check-match: report', (t) => {
    t.report('check-match', `☝️ Looks like 'match()' template absent in 'replace()'`);
    t.end();
});

test('plugin-putout: check-match: no report: identifier', (t) => {
    t.noReport('identifier');
    t.end();
});

test('plugin-putout: check-match: no report: return', (t) => {
    t.noReport('return');
    t.end();
});
