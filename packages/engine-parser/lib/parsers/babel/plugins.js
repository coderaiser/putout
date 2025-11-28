'use strict';

module.exports = [
    'importMeta',
    'importAttributes',
    'dynamicImport',
    'bigInt',
    'classProperties',
    'decorators-legacy',
    'decoratorAutoAccessors',
    'destructuringPrivate',
    'exportDefaultFrom',
    'throwExpressions',
    'deferredImportEvaluation',
    ['discardBinding', {
        syntaxType: 'void',
    }],
    'sourcePhaseImports',
    ['optionalChainingAssign', {
        version: '2023-07',
    }],
];
