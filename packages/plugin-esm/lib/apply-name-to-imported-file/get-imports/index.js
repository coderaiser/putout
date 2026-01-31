import {types} from 'putout';

const {isImportDefaultSpecifier} = types;

export const include = () => [
    'import __a from "__b"',
    'export * as __a from "__b"',
];

export const report = (path) => {
    const [name, source, type] = getImport(path);
    return `${name} <- ${source} <- ${type}`;
};

export const fix = (path) => {
    const [name, source] = getImport(path);
    
    path.node.leadingComments = [
        CommentLine(`${name} <- ${source}'`),
    ];
};

const CommentLine = (value) => ({
    type: 'CommentLine',
    value: ` ${value}`,
});

const getImport = (path) => {
    const source = path.node.source.value;
    const [first] = path.node.specifiers;
    
    if (isImportDefaultSpecifier(first)) {
        const {name} = first.local;
        
        return [
            name,
            source,
            'import',
        ];
    }
    
    const {name} = first.exported;
    
    return [
        name,
        source,
        'export',
    ];
};
