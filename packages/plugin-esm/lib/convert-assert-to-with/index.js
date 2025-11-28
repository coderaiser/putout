import {operator, types} from 'putout';

const {
    importAttribute,
    identifier,
} = types;

const {compare, remove} = operator;

export const report = () => `Use 'with' instead of 'assert'`;

export const include = () => [
    'ImportDeclaration',
    'import(__a, {assert: {type: "json"}})',
];

export const fix = (path) => {
    if (path.isImportExpression()) {
        path.node.options.properties[0].key.name = 'with';
        return;
    }
    
    const next = path.getNextSibling();
    const nextNext = next.getNextSibling();
    const nextNextNext = nextNext.getNextSibling();
    const {body} = nextNext.node.body[0];
    
    remove(next);
    remove(nextNext);
    
    if (nextNextNext.isEmptyStatement())
        remove(nextNextNext);
    
    path.node.attributes = [
        importAttribute(identifier('type'), body.expression),
    ];
};

export const filter = (path) => {
    if (path.isImportDeclaration()) {
        const next = path.getNextSibling();
        
        if (!compare(next, 'assert;'))
            return false;
        
        const nextNext = next.getNextSibling();
        
        return compare(nextNext, '{type: "__";}');
    }
    
    return path.isImportExpression();
};
