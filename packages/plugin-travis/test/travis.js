import {createTest} from '@putout/test';
import * as travis from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['travis', travis],
    ],
});

test('plugin-travis: transform: travis', (t) => {
    t.transform('travis');
    t.end();
});

test('plugin-travis: transform: cache', (t) => {
    t.transform('cache');
    t.end();
});
