import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withoutNot = removeNot(value, where);
    
    return `Avoid useless '!': '${value}' -> '${withoutNot}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, removeNot(value, where));
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
    
    if (includes('!+'))
        traceNot(tools);
    
    if (includes('!-'))
        traceNot(tools);
    
    return where;
}

function traceNot({push, includes}) {
    if (includes('!+'))
        push('before-plus');
    
    if (includes('!-'))
        push('before-minus');
}

function removeNot(value, where) {
    if (where.includes('before-plus'))
        value = value.replace('!+', '-');
    
    if (where.includes('before-minus'))
        value = value.replace('!-', '+');
    
    return value;
}
