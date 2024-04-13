import {createTest} from '@putout/test';
import * as coverage from '../lib/coverage.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['coverage', coverage],
    ],
});

test('plugin-coverage: report', (t) => {
    t.report('coverage', `Add dotfiles to '.nycrc.json'`);
    t.end();
});

test('plugin-coverage: transform', (t) => {
    t.transform('coverage');
    t.end();
});
