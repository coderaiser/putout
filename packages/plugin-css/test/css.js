import {createTest} from '@putout/test';
import * as css from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['css', css],
    ],
});

test('plugin-css: transform: apply-shorthand', (t) => {
    t.transform('apply-shorthand');
    t.end();
});
