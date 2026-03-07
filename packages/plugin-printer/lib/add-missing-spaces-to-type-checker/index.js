import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withSpaces = addSpaces(value, where);
    
    return `Add missing spaces: '${value}' -> '${withSpaces}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, addSpaces(value, where));
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
    
    if (includes('->'))
        traceArrow(tools);
    
    if (includes(':'))
        traceColon(tools);
    
    return where.filter(Boolean);
}

function traceColon({push, includes}) {
    if (!includes(': ') && !includes(':->'))
        push('after-colon');
}

function traceArrow({includes, endsWith, push}) {
    if (!includes(' ->'))
        push('before-arrow');
    
    if (!includes(' ->') && !endsWith('->'))
        push('after-arrow');
}

function addSpaces(value, where) {
    if (where.includes('before-arrow'))
        value = value.replace('->', ' ->');
    
    if (where.includes('after-arrow'))
        value = value.replace('->', '-> ');
    
    if (where.includes('after-colon'))
        value = value.replace(':', ': ');
    
    return value;
}
