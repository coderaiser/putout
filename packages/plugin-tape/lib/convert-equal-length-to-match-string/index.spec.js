import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-equal-length-to-match-string', plugin],
    ],
});

test('tape: convert-equal-length-to-match-string: report', (t) => {
    t.report('convert-equal-length-to-match-string', `Use 't.match()' instead of 't.equal()'`);
    t.end();
});

test('tape: convert-equal-length-to-match-string: transform', (t) => {
    t.transform('convert-equal-length-to-match-string');
    t.end();
});
