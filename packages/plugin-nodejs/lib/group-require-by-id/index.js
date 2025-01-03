'use strict';

const {isDeepStrictEqual} = require('node:util');
const {operator} = require('putout');
const {
    replaceWithMultiple,
    remove,
} = operator;

module.exports.report = () => 'Group require by id';

module.exports.fix = ({grouped}) => {
    const [first, ...others] = grouped;
    const nodes = [first.node];
    
    for (const current of others) {
        const {node} = current;
        
        delete node.declarations[0].loc;
        
        remove(current);
        nodes.push(node);
    }
    
    replaceWithMultiple(first, nodes);
};

module.exports.traverse = ({pathStore, push}) => ({
    'const __ = require(__)': (path) => {
        if (!path.parentPath.isProgram())
            return;
        
        pathStore(path);
    },
    'Program': {
        exit(path) {
            const external = [];
            const internal = [];
            const builtin = [];
            const all = pathStore();
            
            for (const current of all) {
                const [declaration] = current.node.declarations;
                const {value} = declaration.init.arguments[0];
                
                if (!value || value.startsWith('.')) {
                    internal.push(current);
                    continue;
                }
                
                if (value.startsWith('node:')) {
                    builtin.push(current);
                    continue;
                }
                
                external.push(current);
            }
            
            const grouped = [
                ...builtin,
                ...external,
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
