import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-exports-to-add-args', plugin],
    ],
});

test('putout: apply-exports-to-add-args: report', (t) => {
    t.report('apply-exports-to-add-args', `Apply exports to 'addArgs()'`);
    t.end();
});

test('putout: apply-exports-to-add-args: transform', (t) => {
    t.transform('apply-exports-to-add-args');
    t.end();
});
