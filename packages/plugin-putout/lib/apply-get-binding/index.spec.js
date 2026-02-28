import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-get-binding', plugin],
    ],
});

test('putout: apply-get-binding: report', (t) => {
    t.report('apply-get-binding', `Use 'getBinding()' instead of 'path.scope.getBinding()'`);
    t.end();
});

test('putout: apply-get-binding: transform', (t) => {
    t.transform('apply-get-binding');
    t.end();
});
