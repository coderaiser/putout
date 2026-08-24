import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
    isArrayExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withSpaces = removeArrow(value, where);
    
    return `Remove useless arrow: '${value}' -> '${withSpaces}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, removeArrow(value, where));
};
export const traverse = ({push}) => ({
    StringLiteral(path) {
        const call = path.find(isCallExpression);
        
        if (!call)
            return;
        
        if (!isIdentifier(call.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const where = createWhere(path);
        
        if (where.length)
            push({
                path,
                where,
            });
    },
});

function createWhere(path) {
    const {value} = path.node;
    const where = [];
    
    if (value.includes('-> ->'))
        where.push('duplicate');
    
    if (isInsideCompareTuple(path) && value.includes(' -> '))
        where.push('useless');
    
    return where;
}

function removeArrow(value, where) {
    if (where.includes('duplicate'))
        value = value.replace('-> ->', '->');
    
    if (where.includes('useless'))
        value = value.replace(' -> ', '');
    
    return value;
}

function isInsideCompareTuple({parentPath}) {
    if (!isArrayExpression(parentPath))
        return false;
    
    return parentPath.node.elements.length === 3;
}
