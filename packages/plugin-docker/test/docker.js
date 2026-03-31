import {createTest} from '@putout/test';
import * as docker from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['docker', docker],
    ],
});

test('plugin-docker: transform: convert-maintainer-to-label', (t) => {
    t.transform('convert-maintainer-to-label');
    t.end();
});
