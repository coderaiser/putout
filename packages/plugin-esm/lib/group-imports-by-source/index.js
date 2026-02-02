import {isDeepStrictEqual} from 'node:util';
import {types, operator} from 'putout';

const {isImportDeclaration} = types;

const {
    replaceWithMultiple,
    remove,
} = operator;

export const report = () => `Group imports by source: 'builtins', 'external', 'hashed', 'internal'`;

export const fix = ({grouped}) => {
    const [first, ...others] = grouped;
    const nodes = [first.node];
    
    for (const current of others) {
        const {node} = current;
        remove(current);
        nodes.push(node);
    }
    
    replaceWithMultiple(first, nodes);
};

export const traverse = ({push}) => ({
    Program(path) {
        const css = [];
        const builtin = [];
        const external = [];
        const hashed = [];
        const internal = [];
        const all = path.get('body').filter(isImportDeclaration);
        
        if (!all.length)
            return;
        
        for (const current of all) {
            const {value} = current.node.source;
            
            if (value.endsWith('.css')) {
                css.push(current);
                continue;
            }
            
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
            ...css,
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
});
