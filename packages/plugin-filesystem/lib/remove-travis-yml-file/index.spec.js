import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-travis-yml-file', plugin],
    ],
});

test('filesystem: remove-travis-yml-file: report', (t) => {
    t.report('remove-travis-yml-file', `Remove '.travis.yml': '/.travis.yml'`);
    t.end();
});

test('filesystem: remove-travis-yml-file: transform', (t) => {
    t.transform('remove-travis-yml-file');
    t.end();
});
