import {createTest} from '@putout/test';
import * as nextjs from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'nextjs/update-tsconfig': 'on',
    },
    plugins: [
        ['nextjs', nextjs],
    ],
});

test('plugin-nextjs: transform: update-tsconfig', (t) => {
    t.transform('update-tsconfig');
    t.end();
});
