import {createTest} from '@putout/test';
import * as vitest from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['vitest', vitest],
    ],
});

test('plugin-vitest: transform: v3-apply-options-as-second-argument', (t) => {
    t.transform('v3-apply-options-as-second-argument');
    t.end();
});

test('plugin-vitest: transform: v3-apply-browser-instances', (t) => {
    t.transform('v3-apply-browser-instances');
    t.end();
});
