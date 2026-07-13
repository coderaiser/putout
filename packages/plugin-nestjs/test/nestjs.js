import {createTest} from '@putout/test';
import * as nestjs from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nestjs', nestjs],
    ],
});

test('plugin-nestjs: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});
