import {types} from 'putout';

const {
    isIdentifier,
    isVariableDeclaration,
    isFunction,
    isExportNamedDeclaration,
} = types;

export const report = (path) => {
    const {type} = path;
    
    if (isExportNamedDeclaration(path)) {
        const {declaration} = path.node;
        
        if (isFunction(declaration))
            return `${type}:${declaration.id.name}`;
        
        if (isVariableDeclaration(declaration)) {
            const {declarations} = declaration;
            
            if (declarations.length !== 1)
                return type;
            
            const [first] = declarations;
            const {id} = first;
            
            if (isIdentifier(id))
                return `${type}:${id.name}`;
        }
    }
    
    return type;
};

export const fix = (path) => {
    path.node.leadingComments = [
        CommentLine('esm'),
    ];
};

export const include = () => [
    'ExportDefaultDeclaration',
    'ExportNamedDeclaration',
    'ImportDeclaration',
];

const CommentLine = (value) => ({
    type: 'CommentLine',
    value: ` ${value}`,
});
