import {types, operator} from 'putout';

const {
    insertAfter,
    replaceWith,
    getTemplateValues,
} = operator;

const {isStatement} = types;
const MULTIPLY = '__a * __b';

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const fix = (path) => {
    const a = path.find(isStatement);
    const {__a, __b} = getTemplateValues(path, MULTIPLY);
    
    replaceWith(path, __a);
    insertAfter(a, __b);
    __b.generator = true;
};

export const traverse = ({push}) => ({
    [MULTIPLY]: (path) => {
        const rightPath = path.get('right');
        
        if (!rightPath.isFunctionExpression())
            return;
        
        if (!rightPath.node.id)
            return;
        
        push(path);
    },
});
