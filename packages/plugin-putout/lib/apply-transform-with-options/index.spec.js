import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-transform-with-options', plugin],
    ],
});

test('putout: apply-transform-with-options: report', (t) => {
    t.report('apply-transform-with-options', `Use 'transformWithOptions()' instead of 'transform()'`);
    t.end();
});

test('putout: apply-transform-with-options: transform', (t) => {
    t.transform('apply-transform-with-options');
    t.end();
});
