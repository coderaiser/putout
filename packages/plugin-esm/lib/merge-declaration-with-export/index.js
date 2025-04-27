import {operator, types} from 'putout';

const {remove, replaceWith} = operator;
const {
    exportNamedDeclaration,
    isExportSpecifier,
    isVariableDeclarator,
} = types;

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const fix = ({path, bindingPath}) => {
    const {parentPath} = bindingPath;
    const {node} = parentPath;
    
    replaceWith(parentPath, exportNamedDeclaration(node));
    remove(path);
};
export const traverse = ({push}) => ({
    ExportNamedDeclaration(path) {
        const {specifiers} = path.node;
        
        if (!specifiers.length)
            return;
        
        const bindingPaths = [];
        
        for (const spec of specifiers) {
            if (!isExportSpecifier(spec))
                return;
            
            const {local} = spec;
            
            const {name} = local;
            const binding = path.scope.bindings[name];
            
            if (!binding)
                return;
            
            const {path: bindingPath} = binding;
            
            if (!isVariableDeclarator(bindingPath))
                return;
            
            if (!bindingPaths.length) {
                bindingPaths.push(bindingPath);
                continue;
            }
        }
        
        const [bindingPath] = bindingPaths;
        
        push({
            path,
            bindingPath,
        });
    },
});
