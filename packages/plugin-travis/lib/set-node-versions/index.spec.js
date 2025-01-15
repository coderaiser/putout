import {createTest} from '@putout/test';
import * as setNodeVersion from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['travis/set-node-version', setNodeVersion],
    ],
});

test('plugin-travis: set node versions: report', (t) => {
    t.report('travis', 'Latest version of node is missing');
    t.end();
});

test('plugin-travis: set node versions: transform', (t) => {
    t.transform('travis');
    t.end();
});

test('plugin-travis: set node versions: no transform: no-versions', (t) => {
    t.noTransform('no-versions');
    t.end();
});
