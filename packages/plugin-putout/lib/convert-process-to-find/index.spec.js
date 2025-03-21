import {createTest} from '@putout/test';
import * as convertProcessToFind from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-process-to-find', convertProcessToFind],
    ],
});

test('plugin-putout: convert-process-to-find: report: process', (t) => {
    t.report('process', 'Use find instead of process');
    t.end();
});

test('plugin-putout: convert-process-to-find: transform: process', (t) => {
    t.transform('process');
    t.end();
});
