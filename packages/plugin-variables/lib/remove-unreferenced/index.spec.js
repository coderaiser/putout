import {createTest} from '@putout/test';
import * as minify from '@putout/plugin-minify';
import * as forOf from '@putout/plugin-for-of';
import * as removeUnreferencedVariables from './index.js';

const mergeVariables = minify.rules['merge-variables'];
const forOfReduce = forOf.rules.reduce;

const test = createTest(import.meta.url, {
    plugins: [
        ['variables/remove-unreferenced', removeUnreferencedVariables],
    ],
});

test('putout: plugin-variables: remove-unreferenced: report: unreferenced', (t) => {
    t.report('unreferenced', 'Avoid unreferenced variables');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: transform: unreferenced', (t) => {
    t.transform('unreferenced', '\n');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: transform: destr', (t) => {
    t.transform('destr');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: transform: destr-rename', (t) => {
    t.transform('destr-rename');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: transform: upper-scope', (t) => {
    t.transform('upper-scope');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: transform: no-init', (t) => {
    t.transform('no-init');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: no transform: referenced', (t) => {
    t.noTransform('referenced');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: no transform: ternary', (t) => {
    t.noTransform('ternary');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: no report: assignment', (t) => {
    t.noReport('assignment');
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: transform: merge-variables', (t) => {
    t.transform('merge-variables', {
        'minify/merge-variables': mergeVariables,
    });
    t.end();
});

test('putout: plugin-variables: remove-unreferenced: transform: for-of-reduce', (t) => {
    t.transform('for-of-reduce', {
        'for-of/reduce': forOfReduce,
    });
    t.end();
});
