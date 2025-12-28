import {operator, types} from 'putout';

const {remove} = operator;
const {isExportNamedDeclaration} = types;

export const report = () => `Merge export declarations`;

export const fix = ({path, exports}) => {
    const all = [];
    
    for (const path of exports) {
        const {node} = path;
        const {specifiers} = node;
        
        all.push(...specifiers);
        remove(path);
    }
    
    path.node.specifiers.push(...all);
};

export const traverse = ({push}) => ({
    Program(path) {
        const filteredExports = path.get('body').filter(hasSpecifiers);
        const count = filteredExports.length;
        
        if (count < 2)
            return;
        
        const lists = [];
        const marked = new Set();
        
        for (const [i, a] of filteredExports.entries()) {
            if (marked.has(a))
                continue;
            
            for (const b of filteredExports) {
                if (a === b)
                    continue;
                
                if (isSameSources(a, b)) {
                    marked.add(b);
                    
                    lists[i] = lists[i] || [a];
                    lists[i].push(b);
                }
            }
        }
        
        for (const [path, ...exports] of lists) {
            push({
                path,
                exports,
            });
        }
    },
});

function hasSpecifiers(path) {
    if (!isExportNamedDeclaration(path))
        return false;
    
    return path.node.specifiers.length;
}

function isSameSources(a, b) {
    const sourceA = a.node.source;
    const sourceB = b.node.source;
    
    if (!sourceA && sourceA === sourceB)
        return true;
    
    if (!sourceA || !sourceB)
        return false;
    
    return sourceA.value === sourceB.value;
}
