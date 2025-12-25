import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/apply-global-this', plugin],
    ],
});

test('putout: nodejs: apply-global-this: report', (t) => {
    t.report('apply-global-this', `Use 'globalThis' instead of 'global'`);
    t.end();
});

test('putout: nodejs: apply-global-this: transform', (t) => {
    t.transform('apply-global-this');
    t.end();
});
