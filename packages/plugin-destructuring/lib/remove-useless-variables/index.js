import {types, operator} from 'putout';

const {
    isIdentifier,
    isRestElement,
    isAssignmentPattern,
} = types;

const {
    replaceWith,
    createTypeChecker,
} = operator;

const isSimpleFunction = createTypeChecker([
    ['-: params.length', '<', 1],
    ['-: params.length', '>', 1],
    ['-: params.0 -> !Identifier'],
    ['-: params.0.typeAnnotation', Boolean],
    ['+: params.0 -> Identifier'],
]);

const isSmallPattern = createTypeChecker([
    ['-: properties.length', '>', 3],
    ['+: -> ObjectPattern'],
]);

const isSingleReference = createTypeChecker([
    ['-: references', '>', 1],
    ['+: path -> Identifier'],
]);

const MAX_LENGTH = 20;

const getKeyLength = (a) => {
    const {key, value} = a;
    
    if (!isAssignmentPattern(value) && isIdentifier(key))
        return a.key.name.length;
    
    if (isRestElement(a) && isIdentifier(a.argument))
        return a.argument.name.length + 3;
    
    return MAX_LENGTH;
};

const sum = (a, b) => a + getKeyLength(b);

export const report = (path) => {
    return `Avoid useless variable '${path.node.declarations[0].init.name}'`;
};

export const match = () => ({
    'const __object = __a': ({__a, __object}, path) => {
        const {parentPath} = path.parentPath;
        
        if (!parentPath)
            return false;
        
        if (!parentPath.isFunction())
            return false;
        
        if (path.node !== parentPath.node.body.body[0])
            return false;
        
        if (!isSimpleFunction(parentPath.node))
            return false;
        
        if (!isSmallPattern(__object))
            return false;
        
        const [first] = parentPath.node.params;
        
        if (__a.name !== first.name)
            return false;
        
        if (!isSingleReference(path.scope.bindings[first.name]))
            return false;
        
        const namesLength = __object.properties.reduce(sum, 0);
        
        return namesLength < MAX_LENGTH;
    },
});

export const replace = () => ({
    'const __object = __a': ({__object}, path) => {
        replaceWith(path.parentPath.parentPath.get('params.0'), __object);
    },
});
