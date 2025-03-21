import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/apply-vars', plugin],
    ],
});

test('plugin-putout: apply-vars: report', (t) => {
    t.report('apply-vars', `Use 'vars' instead of '{}'`);
    t.end();
});

test('plugin-putout: apply-vars: transform', (t) => {
    t.transform('apply-vars');
    t.end();
});

test('plugin-putout: apply-vars: transform: no-body', (t) => {
    t.transform('no-body');
    t.end();
});
