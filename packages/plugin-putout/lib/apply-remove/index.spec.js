import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-remove', convert],
    ],
});

test('plugin-tape: apply-remove: report', (t) => {
    t.report('apply-remove', `Use 'remove(path)' instead of 'path.remove()'`);
    t.end();
});

test('plugin-tape: apply-remove', (t) => {
    t.transform('apply-remove');
    t.end();
});

test('plugin-tape: apply-remove: other-name', (t) => {
    t.transform('other-name');
    t.end();
});
