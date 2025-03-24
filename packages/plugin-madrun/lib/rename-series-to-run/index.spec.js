import {createTest} from '@putout/test';
import * as renameSeriesToRun from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['madrun/rename-series-to-run', renameSeriesToRun],
    ],
});

test('madrun: rename-series-to-run: report: series', (t) => {
    t.report('series', `"run" should be called instead of "series"`);
    t.end();
});

test('madrun: rename-series-to-run: transform: series', (t) => {
    t.transform('series');
    t.end();
});
