import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as convertCommonjsToExportsRequire from '../convert-commonjs-to-esm/require/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-exports-assign', plugin],
    ],
});

test('nodejs: remove-useless-exports-assign: report', (t) => {
    t.report('remove-useless-exports-assign', `Avoid useless 'exports = module.exports', use 'module.exports' instead`);
    t.end();
});

test('nodejs: remove-useless-exports-assign: transform', (t) => {
    t.transform('remove-useless-exports-assign');
    t.end();
});

test('nodejs: remove-useless-exports-assign: transform: convert-commonjs-to-esm', (t) => {
    t.transform('convert-commonjs-to-esm', {
        convertCommonjsToExportsRequire,
    });
    t.end();
});
