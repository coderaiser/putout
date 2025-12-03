import {createTest} from '@putout/test';
import * as variables from '@putout/plugin-variables';
import * as removeConsole from '@putout/plugin-remove-console';
import * as removeUselessArrayFrom from '../remove-useless-array-from/index.js';
import * as plugin from './index.js';

const removeUnusedVariables = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
    plugins: [
        ['for-of/remove-useless-variables', plugin],
    ],
});

test('putout: plugin-for-of: remove useless variables: report: for-of', (t) => {
    t.report('for-of', `Use destructuring in head of 'for...of'`);
    t.end();
});

test('putout: plugin-for-of: remove useless variables: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('putout: plugin-for-of: remove useless variables: transform: array-pattern', (t) => {
    t.transform('array-pattern');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: no-destr', (t) => {
    t.noTransform('no-destr');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: more-refs', (t) => {
    t.noTransform('more-refs');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: no-declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: for-of-multiple', (t) => {
    t.noTransform('for-of-multiple');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: nested', (t) => {
    t.noReport('nested');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no report: no-declaration', (t) => {
    t.transform('no-declaration', {
        'remove-console': removeConsole,
        'remove-unused-variables': removeUnusedVariables,
    });
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables transform with: array-from', (t) => {
    t.transform('array-from', {
        'remove-useless-array-from': removeUselessArrayFrom,
    });
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables transform with options: for-of-options', (t) => {
    t.transformWithOptions('for-of-options', {
        maxProperties: Infinity,
    });
    t.end();
});
