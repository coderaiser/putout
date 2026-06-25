import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-from-object', plugin],
    ],
});

test('parens: remove-useless-from-object: report', (t) => {
    t.report('remove-useless-from-object', `Avoid useless parens around '{}'`);
    t.end();
});

test('parens: remove-useless-from-object: transform', (t) => {
    t.transform('remove-useless-from-object');
    t.end();
});
