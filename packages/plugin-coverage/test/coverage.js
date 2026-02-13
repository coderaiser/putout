import {createTest} from '@putout/test';
import * as coverage from '../lib/coverage.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['coverage', coverage],
    ],
});

test('plugin-coverage: report: coverage', (t) => {
    t.report('coverage', `Add ignored files to '.nycrc.json'`);
    t.end();
});

test('plugin-coverage: transform: coverage', (t) => {
    t.transform('coverage');
    t.end();
});
