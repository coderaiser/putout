import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-with-resolvers', plugin],
    ],
});

test('promises: apply-with-resolvers: report', (t) => {
    t.report('apply-with-resolvers', `Apply 'Promise.withResolvers()'`);
    t.end();
});

test('promises: apply-with-resolvers: transform', (t) => {
    t.transform('apply-with-resolvers');
    t.end();
});

test('promises: apply-with-resolvers: no report: not-declared', (t) => {
    t.noReport('not-declared');
    t.end();
});

test('promises: apply-with-resolvers: transform: renamed', (t) => {
    t.transform('renamed');
    t.end();
});
