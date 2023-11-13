'use strict';

const {types} = require('putout');

const {parseImportSpecifiers} = require('parse-import-specifiers');
const {isImportDeclaration} = types;
const noop = () => {};

module.exports.report = () => `Use 'import * as plugin' instead of 'import plugin'`;

module.exports.fix = ({first}) => {
    first.node.type = 'ImportNamespaceSpecifier';
};

module.exports.traverse = ({push, listStore, pathStore}) => ({
    'export const rules = __object': listStore,
    'import {createTest} from "@putout/test"': listStore,
    ...createImportVisitor({
        pathStore,
        push,
        names: [
            './index.js',
            '../lib/index.js',
        ],
    }),
    'Program': {
        exit(path) {
            const rules = listStore();
            
            if (rules.length !== 1)
                return;
            
            const [first] = rules;
            
            if (isImportDeclaration(first) && pathStore().length > 2)
                return;
            
            path.traverse(createImportVisitor({
                push,
                names: ['any'],
            }));
        },
    },
});

const createImportVisitor = ({push, names, pathStore = noop}) => ({
    ImportDeclaration(path) {
        pathStore(path);
        
        const {value} = path.node.source;
        const specifiers = path.get('specifiers');
        const [first] = specifiers;
        
        if (!first)
            return;
        
        if (first.isImportNamespaceSpecifier())
            return;
        
        if (first.isImportSpecifier())
            return;
        
        const {defaults, imports} = parseImportSpecifiers(specifiers);
        
        if (defaults.length && imports.length)
            return;
        
        for (const name of names) {
            if (value === name || name === 'any') {
                push({
                    path,
                    first,
                });
                return;
            }
        }
    },
});
