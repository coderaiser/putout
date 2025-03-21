import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-create-test', convert],
    ],
});

test('plugin-tape: apply-create-test: report: test', (t) => {
    t.report('test', `Apply 'createTest'`);
    t.end();
});

test('plugin-tape: test', (t) => {
    t.transform('test');
    t.end();
});
