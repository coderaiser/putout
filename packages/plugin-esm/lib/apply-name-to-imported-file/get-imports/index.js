import {types, operator} from 'putout';

const {getTemplateValues} = operator;
const {
    isImportDefaultSpecifier,
    isVariableDeclaration,
} = types;

const DYNAMIC = 'const __identifier__a = await import(__b)';

export const include = () => [
    'import __a from "__b"',
    'export * as __a from "__b"',
    DYNAMIC,
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
    if (isVariableDeclaration(path)) {
        const {
            __identifier__a,
            __b,
        } = getTemplateValues(path, DYNAMIC);
        
        return [
            __identifier__a.name,
            __b.value,
            'dynamic',
        ];
    }
    
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
