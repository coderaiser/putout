'use strict';

module.exports = [
    'importMeta',
    ['importAttributes', {
        deprecatedAssertSyntax: true,
    }],
    'dynamicImport',
    'bigInt',
    'classProperties',
    'decorators-legacy',
    'decoratorAutoAccessors',
    'destructuringPrivate',
    'exportDefaultFrom',
    'throwExpressions',
    ['recordAndTuple', {
        syntaxType: 'hash',
    }],
    'explicitResourceManagement',
    'deferredImportEvaluation',
    'sourcePhaseImports',
    ['optionalChainingAssign', {
        version: '2023-07',
    }],
];
