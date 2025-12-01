import {types, operator} from 'putout';

const {
    objectExpression,
    isObjectExpression,
    isSpreadElement,
    spreadElement,
} = types;

const {compare, replaceWith} = operator;

export const report = () => `Use merge spread instead of 'Object.assign()'`;

export const fix = (path) => {
    let properties = [];
    const args = path.node.arguments;
    
    for (const arg of args) {
        if (isObjectExpression(arg)) {
            properties = properties.concat(arg.properties);
            continue;
        }
        
        properties = properties.concat(spreadElement(arg));
    }
    
    replaceWith(path, objectExpression(properties));
};

export const include = () => [
    'Object.assign(__args)',
];

export const exclude = () => [
    'Object.assign({}, __)',
];

export const filter = ({node}) => {
    const [first] = node.arguments;
    
    if (!compare(first, '__object'))
        return false;
    
    for (const arg of node.arguments) {
        if (isSpreadElement(arg))
            return false;
    }
    
    return true;
};
