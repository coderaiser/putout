import {operator, types} from 'putout';
import toKebabCase from 'just-kebab-case';

const {
    isIdentifier,
    isArrayExpression,
    stringLiteral,
    arrayExpression,
} = types;

const {replaceWith} = operator;

export const report = () => `Use 'tuple' instead of 'element'`;

export const fix = (path) => {
    const {node} = path;
    const name = toKebabCase(node.name);
    
    replaceWith(path, arrayExpression([
        stringLiteral(name),
        node,
    ]));
};
export const traverse = ({push}) => ({
    't.__a(__b, __array)': (path) => {
        const array = path.get('arguments.1.elements');
        const hasTuple = array.filter(isArrayExpression).length;
        
        if (!hasTuple)
            return;
        
        for (const element of array) {
            if (isArrayExpression(element))
                continue;
            
            if (!isIdentifier(element))
                continue;
            
            push(element);
        }
    },
});
