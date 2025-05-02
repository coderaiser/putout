import {types} from 'putout';

const {
    isNullLiteral,
    isObjectExpression,
    logicalExpression,
} = types;

export const report = () => 'Simplify ternary';

export const fix = (path) => {
    const {test, consequent} = path.node.argument;
    
    path.node.argument = logicalExpression('&&', test, consequent);
};

export const traverse = ({push}) => ({
    SpreadElement(path) {
        const argPath = path.get('argument');
        
        if (!argPath.isConditionalExpression())
            return;
        
        const {alternate} = path.node.argument;
        
        if (isObjectExpression(alternate) && !alternate.properties.length)
            push(path);
        
        if (isNullLiteral(alternate))
            push(path);
    },
});
