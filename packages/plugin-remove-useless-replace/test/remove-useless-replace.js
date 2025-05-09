import {createTest} from '@putout/test';
import * as removeUselessAssign from '../lib/remove-useless-replace.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-replace', removeUselessAssign],
    ],
});

test('plugin-remove-useless-replace: report: replace', (t) => {
    t.report('replace', `Avoid useless 'replace()'`);
    t.end();
});

test('plugin-remove-useless-replace: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});
