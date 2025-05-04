import {operator, types} from 'putout';

const {remove, rename} = operator;
const {isIdentifier} = types;

export const report = ({idName}) => `Useless variable declaration with name "${idName}"`;

export const fix = ({path, bindingPath, initName, idName}) => {
    rename(bindingPath, initName, idName);
    remove(path);
};

export const traverse = ({push}) => ({
    VariableDeclarator(path) {
        const {node, parentPath} = path;
        
        const {id, init} = node;
        
        if (parentPath.parentPath.isExportNamedDeclaration())
            return;
        
        if (!isIdentifier(init))
            return;
        
        if (!isIdentifier(id))
            return;
        
        const {name} = init;
        
        if (id.name.length < name.length)
            return;
        
        if (id.name === name.toUpperCase())
            return;
        
        const binding = path.scope.bindings[name];
        
        if (!binding)
            return;
        
        if (binding.referencePaths.length > 1)
            return;
        
        const bindingPath = binding.path;
        
        if (bindingPath.isVariableDeclarator() && bindingPath.get('id').isObjectPattern())
            return;
        
        if (bindingPath.isObjectPattern())
            return;
        
        push({
            path,
            bindingPath,
            initName: init.name,
            idName: id.name,
        });
    },
});
