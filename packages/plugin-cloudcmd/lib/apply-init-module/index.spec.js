import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-init-module', plugin],
    ],
});

test('cloudcmd: apply-init-module: report', (t) => {
    t.report('apply-init-module', `Use 'init/show/hide' instead of 'exports'`);
    t.end();
});

test('cloudcmd: apply-init-module: transform', (t) => {
    t.transform('apply-init-module');
    t.end();
});

test('cloudcmd: apply-init-module: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});
