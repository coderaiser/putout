import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as slice from '../remove-useless-slice/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-export-match-to-declaration', plugin],
    ],
});

test('eslint: convert-export-match-to-declaration: report', (t) => {
    t.report('convert-export-match-to-declaration', `Export 'match' at end of file in CommonJS`);
    t.end();
});

test('eslint: convert-export-match-to-declaration: transform', (t) => {
    t.transform('convert-export-match-to-declaration');
    t.end();
});

test('eslint: remove-useless-slice: transform: slice', (t) => {
    t.transform('slice', {
        'remove-useless-slice': slice,
    });
    t.end();
});
