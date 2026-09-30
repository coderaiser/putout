import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-replacer-to-includer', plugin],
    ],
});

test('putout: convert-replacer-to-includer: report', (t) => {
    t.report('convert-replacer-to-includer', `Use 'Includer' instead of 'Replacer'`);
    t.end();
});

test('putout: convert-replacer-to-includer: transform', (t) => {
    t.transform('convert-replacer-to-includer');
    t.end();
});

test('putout: convert-replacer-to-includer: no report: not-string', (t) => {
    t.noReport('not-string');
    t.end();
});
