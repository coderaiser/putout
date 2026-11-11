import {types, operator} from 'putout';

const {
    findBinding,
    rename,
    replaceWith,
    createTypeChecker,
} = operator;

const {
    isImportSpecifier,
    identifier,
    isStringLiteral,
} = types;

const isShorthand = ({node}) => node.shorthand;
const isKeyMismatch = ({node}) => node.computed !== isStringLiteral(node.key);
const isCapitalized = (name) => /^[A-Z].+$/.test(name);
const isEmpty = (name) => !name;
const isIgnored = (name, {ignore}) => ignore.includes(name);

const isSupportedProperty = createTypeChecker([
    ['-', isShorthand],
    ['-: node.value -> StringLiteral'],
    ['-', isKeyMismatch],
    ['+: -> +'],
]);

const isSupportedName = createTypeChecker([
    ['-', isEmpty],
    ['-', isCapitalized],
    ['-', isIgnored],
    ['+: -> +'],
]);

const isUnsupportedPattern = createTypeChecker([
    '+: -> ImportDefaultSpecifier',
    '+: -> ImportSpecifier',
    '+: -> ObjectPattern',
    '+: node.id -> ObjectPattern',
]);

export const report = () => `Use shorthand properties`;

export const fix = ({path, from, to, keyPath, toRename}) => {
    if (isImportSpecifier(path)) {
        path.node.imported = path.node.local;
        return;
    }
    
    if (toRename)
        rename(path, from, to);
    
    path.node.shorthand = true;
    
    if (keyPath.isStringLiteral()) {
        replaceWith(keyPath, identifier(keyPath.node.value));
        path.node.computed = false;
    }
};

export const traverse = ({push, options}) => ({
    ImportSpecifier(path) {
        if (path.node.imported.value === path.node.local.name)
            push({
                path,
            });
    },
    '__object'(path) {
        const properties = path.get('properties');
        
        if (hasDefault(properties))
            return;
        
        for (const propPath of properties) {
            if (!isSupportedProperty(propPath))
                continue;
            
            const keyPath = propPath.get('key');
            const valuePath = propPath.get('value');
            const {rename, ignore = []} = options;
            
            const from = getName(valuePath);
            const to = getName(keyPath);
            
            if (!isSupportedName(from, {ignore}))
                continue;
            
            if (!rename) {
                if (from === to)
                    push({
                        path: propPath,
                        from,
                        to,
                        keyPath,
                    });
                
                continue;
            }
            
            const bindingFrom = findBinding(propPath, from);
            const bindingTo = findBinding(propPath, to);
            
            if (bindingTo || !bindingFrom)
                continue;
            
            const {references, path} = bindingFrom;
            
            if (isUnsupportedPattern(path))
                continue;
            
            if (references > 1)
                continue;
            
            push({
                path: propPath,
                from,
                to,
                keyPath,
                toRename: true,
            });
        }
    },
});

function getName(path) {
    const {node} = path;
    
    if (path.isIdentifier())
        return node.name;
    
    if (path.isStringLiteral())
        return node.value;
    
    return '';
}

function hasDefault(properties) {
    for (const property of properties) {
        if (isStringLiteral(property.node.value, {value: 'default'}))
            return true;
    }
    
    return false;
}
