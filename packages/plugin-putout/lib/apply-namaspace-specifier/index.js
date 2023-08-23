'use strict';

module.exports.report = () => `Use 'import * as plugin' instead of 'import plugin'`;

module.exports.fix = ({first}) => {
    first.node.type = 'ImportNamespaceSpecifier';
};

module.exports.traverse = ({push, listStore}) => ({
    'export const rules = __object': listStore,
    'import {createTest} from "@putout/test"': listStore,
    ...createImportVisitor({
        push,
        names: [
            './index.js',
            '../lib/index.js',
        ],
    }),
    'Program': {
        exit(path) {
            const rules = listStore();
            
            if (!rules.length)
                return;
            
            path.traverse(createImportVisitor({
                push,
                names: ['any'],
            }));
        },
    },
});

const createImportVisitor = ({push, names}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        const first = path.get('specifiers.0');
        
        if (!first)
            return;
        
        if (first.isImportNamespaceSpecifier())
            return;
        
        if (first.isImportSpecifier())
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
