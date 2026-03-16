import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withoutNot = removePath(value, where);
    
    return `Avoid useless 'path': '${value}' -> '${withoutNot}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, removePath(value, where));
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
    const includes = value.includes.bind(value);
    const endsWith = value.endsWith.bind(value);
    const push = where.push.bind(where);
    
    const tools = {
        push,
        includes,
        endsWith,
    };
    
    if (includes('path.'))
        tracePath(tools);
    
    return where;
}

function tracePath({push, includes}) {
    if (includes('path.'))
        push('path');
}

function removePath(value, where) {
    if (where.includes('path'))
        value = value.replace('path.', '');
    
    return value;
}
