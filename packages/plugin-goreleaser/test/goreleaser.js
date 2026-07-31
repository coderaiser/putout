import {createTest} from '@putout/test';
import * as goreleaser from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['goreleaser', goreleaser],
    ],
});

test('plugin-goreleaser: transform: apply-format-overrides', (t) => {
    t.transform('apply-format-overrides');
    t.end();
});
