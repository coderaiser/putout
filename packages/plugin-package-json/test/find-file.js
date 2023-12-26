'use strict';

const {createTest} = require('@putout/test');
const packageJson = require('..');
const [, findFile] = packageJson.rules['find-file'];

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'package-json/find-file': 'on',
    },
    plugins: [
        ['package-json/find-file', findFile],
    ],
});

test('putout: plugin-package-json: findFile: transform', (t) => {
    t.transform('find-file');
    t.end();
});
