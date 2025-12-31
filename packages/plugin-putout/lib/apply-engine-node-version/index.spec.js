import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-engine-node-version', plugin],
    ],
});

test('putout: apply-engine-node-version: report', (t) => {
    t.report('apply-engine-node-version', `Set engines node '>=22' instead of '>=20' for 🐊 '>=41'`);
    t.end();
});

test('putout: apply-engine-node-version: transform', (t) => {
    t.transform('apply-engine-node-version');
    t.end();
});

test('putout: apply-engine-node-version: no report: no-peer', (t) => {
    t.noReport('no-peer');
    t.end();
});
