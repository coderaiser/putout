import {createTest} from '@putout/test';
import * as shortenPutoutExports from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/shorten-putout-exports', shortenPutoutExports],
    ],
});

test('plugin-putout: shorten-putout-exports: report: shorten-imports', (t) => {
    t.report('shorten-imports', 'Shorten require path to putout exports');
    t.end();
});

test('plugin-putout: shorten-putout-exports: transform: shorten-imports', (t) => {
    t.transform('shorten-imports');
    t.end();
});

test('plugin-putout: shorten-putout-exports: transform: parse-options', (t) => {
    t.transform('parse-options');
    t.end();
});
