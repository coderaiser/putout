import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/convert-dirname-to-url', convert],
    ],
});

test('nodejs: convert-dirname-to-url: report: esm', (t) => {
    t.report('esm', `Use 'import.meta.url' instead of '__dirname'`);
    t.end();
});

test('nodejs: convert-dirname-to-url: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});
