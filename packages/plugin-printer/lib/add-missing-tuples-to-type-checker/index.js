import process from 'node:process';
import {operator, types} from 'putout';
import {createTypeChecker} from '@putout/printer/type-checker';

const {
    isArrayExpression,
    isIdentifier,
    isCallExpression,
    isStringLiteral,
    arrayExpression,
    stringLiteral,
} = types;

const {replaceWith} = operator;

const hasResult = (value) => /^[+-]/.test(value);
const typeOptions = {
    instrument: Boolean(process.env.PUTOUT_INSTRUMENT),
};

const isDsl = createTypeChecker([
    ['-: -> !StringLiteral'],
    ['+: node.value ->', hasResult],
], typeOptions);

const isSimple = createTypeChecker([
    ['+: -> Identifier'],
    ['+: -> CallExpression'],
    ['-: -> !StringLiteral'],
    ['+: node.value -> !', hasResult],
], typeOptions);

export const report = (path) => {
    return `Add missing tuple around: ${path}`;
};

export const fix = (path) => {
    const {node} = path;
    
    if (isIdentifier(path) || isCallExpression(path)) {
        replaceWith(path, arrayExpression([stringLiteral('+'), node]));
        return;
    }
    
    const {value} = node;
    
    if (isStringLiteral(path) && !/^[+-]/.test(value)) {
        replaceWith(path, arrayExpression([stringLiteral(`+: -> ${value}`)]));
        return;
    }
    
    replaceWith(path, arrayExpression([node]));
};

export const traverse = ({push}) => ({
    ArrayExpression(path) {
        const {parentPath} = path;
        
        if (!isCallExpression(parentPath))
            return;
        
        if (!isIdentifier(parentPath.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const elements = path.get('elements');
        
        if (isConsistent(elements))
            return;
        
        for (const element of elements) {
            if (!isArrayExpression(element))
                push(element);
        }
    },
});

function isConsistent(elements) {
    const arraysCount = elements.filter(isArrayExpression).length;
    
    if (elements.length === arraysCount)
        return true;
    
    const simplesCount = elements.filter(isSimple).length;
    
    if (elements.length === simplesCount)
        return true;
    
    const dslCount = elements.filter(isDsl).length;
    
    return elements.length === dslCount;
}
