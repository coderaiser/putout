import {types, operator} from 'putout';

const {remove, replaceWith} = operator;
const {
    variableDeclaration,
    isVariableDeclarator,
    exportNamedDeclaration,
    isFunctionDeclaration,
    isImportSpecifier,
    isImportDefaultSpecifier,
} = types;

export const report = () => `Inline export`;
export const include = () => [
    'export {__exports}',
];
export const exclude = () => [`export * as __a from '__b'`];

export const filter = (path) => {
    const {scope} = path;
    const specifiers = path.get('specifiers');
    
    for (const spec of specifiers) {
        const {local, exported} = spec.node;
        const {name} = local;
        
        if (name !== exported.name)
            return false;
        
        const binding = scope.bindings[name];
        
        if (!binding)
            return false;
        
        const bindingPath = binding.path;
        
        if (isImportSpecifier(bindingPath))
            return false;
        
        if (isImportDefaultSpecifier(bindingPath))
            return false;
    }
    
    return true;
};

export const fix = (path) => {
    const {scope} = path;
    const specifiers = path.get('specifiers');
    
    for (const spec of specifiers) {
        const {local} = spec.node;
        const {name} = local;
        
        const binding = scope.bindings[name];
        const bindingPath = binding.path;
        
        if (isFunctionDeclaration(bindingPath)) {
            replaceWith(bindingPath, exportNamedDeclaration(bindingPath.node));
            continue;
        }
        
        if (isVariableDeclarator(bindingPath)) {
            const declaration = variableDeclaration('const', [bindingPath.node]);
            replaceWith(bindingPath.parentPath, exportNamedDeclaration(declaration));
            continue;
        }
    }
    
    remove(path);
};
