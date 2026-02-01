import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-crawl-file', plugin],
    ],
});

test('putout: add-crawl-file: report', (t) => {
    t.report('add-crawl-file', `Argument 'crawlFile' is missing`);
    t.end();
});

test('putout: add-crawl-file: transform', (t) => {
    t.transform('add-crawl-file');
    t.end();
});
