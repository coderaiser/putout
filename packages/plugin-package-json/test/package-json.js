'use strict';

const packageJson = require('..');

const test = require('@putout/test')(__dirname, {
    'package-json': packageJson,
});

test('putout: plugin-package-json: remove-nyc: complex: report', (t) => {
    t.report('nyc', 'Remove nyc section of package.json, use file .nycrc.json intead');
    t.end();
});

test('putout: plugin-package-json: remove-nyc: complex: transform', (t) => {
    t.transform('nyc');
    t.end();
});

