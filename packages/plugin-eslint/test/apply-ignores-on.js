import {createTest} from '@putout/test';
import * as eslint from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'eslint/apply-ignores': 'on',
    },
    plugins: [
        ['eslint', eslint],
    ],
});

test('plugin-eslint: transform: apply-ignores-on', (t) => {
    t.transform('apply-ignores-on');
    t.end();
});
