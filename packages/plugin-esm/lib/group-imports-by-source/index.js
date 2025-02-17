'use strict';

const {isDeepStrictEqual} = require('node:util');
const {types, operator} = require('putout');
const {isImportDeclaration} = types;

const {
    replaceWithMultiple,
    remove,
} = operator;

module.exports.report = () => `Group imports by source: 'builtins', 'external', 'hashed', 'internal'`;

module.exports.fix = ({grouped}) => {
    const [first, ...others] = grouped;
    const nodes = [first.node];
    
    for (const current of others) {
        const {node} = current;
        remove(current);
        nodes.push(node);
    }
    
    replaceWithMultiple(first, nodes);
};

module.exports.traverse = ({pathStore, push}) => ({
    ImportDeclaration: pathStore,
    Program: {
        exit(path) {
            const external = [];
            const internal = [];
            const builtin = [];
            const hashed = [];
            const all = pathStore().filter(isImportDeclaration);
            
            if (!all.length)
                return;
            
            for (const current of all) {
                const {value} = current.node.source;
                
                if (value.startsWith('.')) {
                    internal.push(current);
                    continue;
                }
                
                if (value.startsWith('node:')) {
                    builtin.push(current);
                    continue;
                }
                
                if (value.startsWith('#')) {
                    hashed.push(current);
                    continue;
                }
                
                external.push(current);
            }
            
            const grouped = [
                ...builtin,
                ...external,
                ...hashed,
                ...internal,
            ];
            
            if (isDeepStrictEqual(all, grouped))
                return;
            
            push({
                path,
                grouped,
            });
        },
    },
});
