import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withSpaces = addColon(value, where);
    
    return `Remove useless arrow: '${value}' -> '${withSpaces}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, addColon(value, where));
};
export const traverse = ({push}) => ({
    StringLiteral(path) {
        const call = path.find(isCallExpression);
        
        if (!call)
            return;
        
        if (!isIdentifier(call.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const {value} = path.node;
        const where = createWhere(value);
        
        if (where.length)
            push({
                path,
                where,
            });
    },
});

function createWhere(value) {
    const where = [];
    
    if (value.includes('-> ->'))
        where.push('duplicate');
    
    return where;
}

function addColon(value, where) {
    if (where.includes('duplicate'))
        value = value.replace('-> ->', '->');
    
    return value;
}
