import {types, operator} from 'putout';

const {rename, getBindingPath} = operator;

const {
    isVariableDeclarator,
    isIdentifier,
} = types;

export const report = () => `Use lowercased node builders`;

export const fix = (path) => {
    const {name} = path.node;
    const newName = getNewName(name);
    const bindings = path.scope.getAllBindings();
    
    if (!bindings[newName])
        rename(path, name, newName);
    
    path.node.name = newName;
};

export const traverse = ({push}) => ({
    ReferencedIdentifier(path) {
        const {name} = path.node;
        const [first, second] = name;
        
        const bindingPath = getBindingPath(path, name);
        
        if (!isVariableDeclarator(bindingPath))
            return;
        
        if (!isIdentifier(bindingPath.node.init, {name: 'types'}))
            return;
        
        if (!/[A-Z]/.test(first))
            return;
        
        if (!/[a-z]/.test(second) && !/^(TS|JSX)/.test(name))
            return;
        
        if (!types[name])
            return;
        
        push(path);
    },
});

const getNewName = (name) => {
    if (name.startsWith('TS')) {
        const other = name.slice(2);
        return `ts${other}`;
    }
    
    if (name.startsWith('JSX')) {
        const other = name.slice(3);
        return `jsx${other}`;
    }
    
    const [first] = name;
    const other = name.slice(1);
    
    return first.toLowerCase() + other;
};
