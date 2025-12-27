import {createTest} from '@putout/test';
import * as declareBeforeReference from '@putout/plugin-declare-before-reference';
import * as variables from '@putout/plugin-variables';
import * as esm from '@putout/plugin-esm';
import {types, operator} from 'putout';
import * as convertEsmToCommonjs from '../convert-esm-to-commonjs/index.js';
import * as plugin from './index.js';

const {remove, replaceWith} = operator;

const {
    variableDeclaration,
    exportNamedDeclaration,
} = types;

const mergeDeclarationWithExport = esm.rules['merge-declaration-with-export'];
const reuseDuplicateInit = variables.rules['reuse-duplicate-init'];

const test = createTest(import.meta.url, {
    plugins: [
        ['group-require-by-id', plugin],
    ],
});

test('nodejs: group-require-by-id: report', (t) => {
    t.report('group-require-by-id', `Group require by id`);
    t.end();
});

test('nodejs: group-require-by-id: no report: grouped', (t) => {
    t.noReport('grouped');
    t.end();
});

test('nodejs: group-require-by-id: no report: not-top-level', (t) => {
    t.noReport('not-top-level');
    t.end();
});

test('nodejs: group-require-by-id: transform', (t) => {
    t.transform('group-require-by-id');
    t.end();
});

test('nodejs: group-require-by-id: transform: comments', (t) => {
    t.transform('comments');
    t.end();
});

test('nodejs: group-require-by-id: merge-declaration-with-export', (t) => {
    t.transform('merge-declaration-with-export', {
        mergeDeclarationWithExport,
        convertEsmToCommonjs,
    });
    t.end();
});

test('nodejs: group-require-by-id: no-argument', (t) => {
    const replacer = {
        report: () => `Replace`,
        replace: () => ({
            'const __a = require(__b)': 'const __a = () => {}',
        }),
    };
    
    t.transform('no-argument', {
        replacer,
    });
    t.end();
});

test('nodejs: group-require-by-id: merge', (t) => {
    const merge = {
        report: () => `Inline export`,
        include: () => [
            'export {__exports}',
        ],
        fix: (path) => {
            const {scope} = path;
            
            const [spec] = path.get('specifiers');
            const {local} = spec.node;
            const {name} = local;
            
            const binding = scope.bindings[name];
            const bindingPath = binding.path;
            
            const declaration = variableDeclaration('const', [bindingPath.node]);
            
            replaceWith(bindingPath.parentPath, exportNamedDeclaration(declaration));
            remove(path);
        },
    };
    
    t.transform('merge', {
        merge,
    });
    t.end();
});

test('plugin-nodejs: group-require-by-id: no report after transform: declare-before-reference', (t) => {
    t.noReportAfterTransform('declare-before-reference', {
        'declare-before-reference': declareBeforeReference,
        'reuse-duplicate-init': reuseDuplicateInit,
    });
    t.end();
});
