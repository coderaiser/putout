import {types, operator} from 'putout';
import {isTypeExists} from '#types';

const {
    isArrayExpression,
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;
const cutIS = (a) => a.slice(2);

const prepareValue = (a) => {
    if (/^[+-]$/.test(a))
        return `${a}: `;
    
    if (a.endsWith('!'))
        return a;
    
    return `${a} `;
};

export const report = () => `Merge tuple of type checker`;

export const fix = ({path, name}) => {
    const [first] = path.node.elements;
    const {value} = first;
    
    setLiteralValue(first, `${prepareValue(value)}${name}`);
    path.node.elements.pop();
};

export const traverse = ({push}) => ({
    ArrayExpression(path) {
        const {parentPath} = path;
        
        if (!isCallExpression(parentPath))
            return;
        
        const {callee} = parentPath.node;
        
        if (!isIdentifier(callee, {name: 'createTypeChecker'}))
            return;
        
        const elements = path.get('elements');
        
        for (const element of elements) {
            if (!isArrayExpression(element))
                continue;
            
            const [, checker] = element.get('elements');
            
            if (!isIdentifier(checker))
                continue;
            
            const checkerName = checker.node.name;
            
            if (!checkerName.startsWith('is'))
                continue;
            
            const name = cutIS(checkerName);
            
            if (isTypeExists(name))
                push({
                    path: element,
                    name,
                });
        }
    },
});
