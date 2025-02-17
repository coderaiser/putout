'use strict';

const {createTest} = require('@putout/test');

const nodejs = require('@putout/plugin-nodejs');
const plugin = require('..');

const sortImportsBySpecifiers = require('../sort-imports-by-specifiers');
const convertEsmToCommonJS = nodejs.rules['convert-esm-to-commonjs'];

const test = createTest(__dirname, {
    plugins: [
        ['group-imports-by-source', plugin],
    ],
});

test('putout: group-imports-by-source: report', (t) => {
    t.report('group-imports-by-source', `Group imports by source: 'builtins', 'external', 'hashed', 'internal'`);
    t.end();
});

test('putout: group-imports-by-source: no report: no-imports', (t) => {
    t.noReport('no-imports');
    t.end();
});

test('putout: group-imports-by-source: no report: grouped', (t) => {
    t.noReport('grouped');
    t.end();
});

test('putout: group-imports-by-source: transform', (t) => {
    t.transform('group-imports-by-source');
    t.end();
});

test('putout: group-imports-by-source: transform: convert-esm-to-commonjs', (t) => {
    t.transform('convert-esm-to-commonjs', {
        convertEsmToCommonJS,
    });
    t.end();
});

test('putout: group-imports-by-source: transform: sort-imports-by-specifiers', (t) => {
    t.noReportAfterTransform('sort-imports-by-specifiers', {
        sortImportsBySpecifiers,
    });
    t.end();
});
