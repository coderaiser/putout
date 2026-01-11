import {types} from 'putout';

const {isArrayExpression} = types;

export const category = 'object';
export const report = () => 'Remove newline from empty object';

const regExp = /\n/;

export const filter = ({text, node, getCommentsInside}) => {
    const comments = getCommentsInside(node);
    
    if (comments.length)
        return false;
    
    if (isArrayExpression(node.parent))
        return false;
    
    if (node.properties.length)
        return false;
    
    return regExp.test(text);
};

export const fix = () => '{}';

export const include = () => [
    'ObjectExpression',
];
