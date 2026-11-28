import {operator, types} from 'putout';

const {
    isArrayExpression,
    isStringLiteral,
    isIdentifier,
    isCallExpression,
} = types;

const {
    remove,
    setLiteralValue,
} = operator;

const SUCCESS = /^\+\s*:?\s*->\s*\+$/;
const FAIL_NOT = /^-(.*->\s*)!(\w+)$/;

const merge = (value) => value.replace(FAIL_NOT, '+$1$2');

export const report = ({path}) => {
    const {value} = path.node;
    
    return `Merge useless success route with fail route: '${value}' -> '${merge(value)}'`;
};

export const fix = ({path, success}) => {
    setLiteralValue(path, merge(path.node.value));
    remove(success);
};

export const traverse = ({push}) => ({
    ArrayExpression(path) {
        const {parentPath} = path;
        
        if (!isCallExpression(parentPath))
            return;
        
        if (!isIdentifier(parentPath.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const elements = path.get('elements');
        const success = elements.pop();
        const fail = elements.pop();
        
        if (!fail)
            return;
        
        const successLiteral = getLiteral(success);
        const failLiteral = getLiteral(fail);
        
        if (!successLiteral || !failLiteral)
            return;
        
        if (!SUCCESS.test(successLiteral.node.value))
            return;
        
        if (!FAIL_NOT.test(failLiteral.node.value))
            return;
        
        push({
            path: failLiteral,
            success,
        });
    },
});

function getLiteral(path) {
    if (isStringLiteral(path))
        return path;
    
    if (!isArrayExpression(path))
        return null;
    
    const elements = path.get('elements');
    
    if (elements.length !== 1)
        return null;
    
    const [element] = elements;
    
    if (isStringLiteral(element))
        return element;
    
    return null;
}
