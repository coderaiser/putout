import {operator, types} from 'putout';

const {isExportNamedDeclaration} = types;
const {remove} = operator;

export const report = () => `Merge export declarations`;

export const fix = ({path, count, exports}) => {
    const all = [];
    
    for (const [index, path] of exports.entries()) {
        const {node} = path;
        const {specifiers} = node;
        
        all.push(...specifiers);
        
        if (index < count - 1)
            remove(path);
    }
    
    path.node.specifiers = all;
};

export const traverse = ({push}) => ({
    Program(path) {
        const exports = path.get('body').filter(hasSpecifiers);
        const count = exports.length;
        
        if (count < 2)
            return;
        
        push({
            path: exports.at(-1),
            exports,
            count,
        });
    },
});

function hasSpecifiers(path) {
    if (!isExportNamedDeclaration(path))
        return false;
    
    return path.node.specifiers.length;
}
