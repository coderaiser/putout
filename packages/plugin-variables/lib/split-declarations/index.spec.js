import {createTest} from '@putout/test';
import * as removeUnusedVariables from '@putout/plugin-remove-unused-variables';
import * as splitVariableDeclarations from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['variables/split-declarations', splitVariableDeclarations],
    ],
});

test('putout: plugin-variables: split-declarations report: split-variable-declarations', (t) => {
    t.report('split-variable-declarations', 'Variables should be declared separately');
    t.end();
});

test('putout: plugin-variables: split-declarations transform: split-variable-declarations', (t) => {
    t.transform('split-variable-declarations');
    t.end();
});

test('putout: plugin-variables: split-declarations transform: for-statement', (t) => {
    t.transform('for-statement');
    t.end();
});

test('putout: plugin-variables: split-declarations transform: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('putout: plugin-variables: split-declarations no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('putout: plugin-variables: split-declarations no transform: keyword', (t) => {
    t.noTransform('keyword');
    t.end();
});

test('putout: plugin-variables: split-declarations null literal: loc', (t) => {
    t.transform('null-literal', '\n', {
        'remove-unused-variables': removeUnusedVariables,
    });
    t.end();
});
