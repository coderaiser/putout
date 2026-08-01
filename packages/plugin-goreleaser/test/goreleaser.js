import {createTest} from '@putout/test';
import * as goreleaser from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['goreleaser', goreleaser],
    ],
});

test('plugin-goreleaser: transform: apply-formats', (t) => {
    t.transform('apply-formats');
    t.end();
});
