import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['math/declare', declare],
    ],
});

test('plugin-math: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});
