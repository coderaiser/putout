import {createTest} from '@putout/test';
import * as madrun from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'madrun/insert-test-dts': 'on',
    },
    plugins: [
        ['madrun', madrun],
    ],
});

test('plugin-madrun: transform: insert-test-dts-on', (t) => {
    t.transform('insert-test-dts-on');
    t.end();
});
