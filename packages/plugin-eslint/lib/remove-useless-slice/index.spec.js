import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as match from '../convert-export-match-to-declaration/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-slice', plugin],
    ],
});

test('eslint: remove-useless-slice: report', (t) => {
    t.report('remove-useless-slice', `Avoid useless '.slice()' in Flat Config`);
    t.end();
});

test('eslint: remove-useless-slice: transform', (t) => {
    t.transform('remove-useless-slice');
    t.end();
});

test('eslint: remove-useless-slice: transform: match', (t) => {
    t.transform('match', {
        'convert-export-match-to-declaration': match,
    });
    t.end();
});
