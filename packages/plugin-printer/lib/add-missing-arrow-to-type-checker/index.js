import {operator, types} from 'putout';
import {isTypeExists} from '#types';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = ({path, where}) => {
    const {value} = path.node;
    const withSpaces = addArrow(value, where);
    
    return `Add missing arrow: '${value}' -> '${withSpaces}'`;
};

export const fix = ({path, where}) => {
    const {value} = path.node;
    setLiteralValue(path, addArrow(value, where));
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
    
    if (value.startsWith('+: !') && !value.includes('->'))
        where.push('after-colon');
    
    if (value.startsWith('-: !') && !value.includes('->'))
        where.push('after-colon');
    
    if (value.startsWith('+: ') && !value.includes('->')) {
        const type = value.replace('+: ', '');
        
        if (isTypeExists(type))
            where.push('before-type');
    }
    
    if (value.startsWith('-: ') && !value.includes('->')) {
        const type = value.replace('-: ', '');
        
        if (isTypeExists(type))
            where.push('before-type');
    }
    
    return where;
}

function addArrow(value, where) {
    if (where.includes('after-colon'))
        value = value.replace(': !', ': -> !');
    
    if (where.includes('before-type'))
        value = value.replace(': ', ': -> ');
    
    return value;
}
