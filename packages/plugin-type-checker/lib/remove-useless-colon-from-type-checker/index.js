import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withoutColon = addColon(value, where);
    
    return `Remove useless colon: '${value}' -> '${withoutColon}'`;
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
    
    if (value.length !== 2)
        return where;
    
    if (value === '+:')
        where.push('after-plus');
    
    if (value === '-:')
        where.push('after-minus');
    
    return where;
}

function addColon(value, where) {
    if (where.includes('after-plus'))
        value = value.replace('+:', '+');
    
    if (where.includes('after-minus'))
        value = value.replace('-:', '-');
    
    return value;
}
