import {isDeepStrictEqual} from 'node:util';
import {operator} from 'putout';

const {
    replaceWithMultiple,
    remove,
    compare,
} = operator;

const REQUIRE = 'const __ = require(__)';

const compareWith = (a) => (b) => compare(b, a);
const compareWithRequire = compareWith(REQUIRE);

export const report = () => 'Group require by id';

export const fix = ({grouped}) => {
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

export const traverse = ({push}) => ({
    Program(path) {
        const external = [];
        const internal = [];
        const builtin = [];
        const all = path.get('body').filter(compareWithRequire);
        
        if (!all.length)
            return;
        
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
});
