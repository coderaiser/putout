import {createTest} from '@putout/test';
import * as convertFindToTraverse from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-return-undefined', convertFindToTraverse],
    ],
});

test('plugin-minify: remove-return-undefined: report', (t) => {
    t.report('remove-return-undefined', `Avoid 'return undefined'`);
    t.end();
});

test('plugin-minify: remove-return-undefined: transform', (t) => {
    t.transform('remove-return-undefined');
    t.end();
});
