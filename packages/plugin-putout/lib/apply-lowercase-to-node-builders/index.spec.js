import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-lowercase-to-node-builders', plugin],
    ],
});

test('putout: apply-lowercase-to-node-builders: report', (t) => {
    t.report('apply-lowercase-to-node-builders', `Use lowercased node builders`);
    t.end();
});

test('putout: apply-lowercase-to-node-builders: transform', (t) => {
    t.transform('apply-lowercase-to-node-builders');
    t.end();
});

test('putout: apply-lowercase-to-node-builders: no report: not-builder', (t) => {
    t.noReport('not-builder');
    t.end();
});

test('putout: apply-lowercase-to-node-builders: transform: ts', (t) => {
    t.transform('ts');
    t.end();
});

test('putout: apply-lowercase-to-node-builders: transform: referenced', (t) => {
    t.transform('referenced');
    t.end();
});
