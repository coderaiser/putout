import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withSpaces = removeSpaces(value, where);
    
    return `Remove useless spaces: '${value}' -> '${withSpaces}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, removeSpaces(value, where));
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
    
    if (includes(' :'))
        traceColon(tools);
    
    return where;
}

function traceColon({push, includes}) {
    if (includes(' :'))
        push('before-colon');
}

function removeSpaces(value, where) {
    if (where.includes('before-colon'))
        value = value.replace(' :', ':');
    
    return value;
}
