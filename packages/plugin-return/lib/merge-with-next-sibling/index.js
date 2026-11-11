import {types, operator} from 'putout';

const {
    objectExpression,
    objectProperty,
} = types;

const {
    remove,
    createTypeChecker,
} = operator;

const isEmptyReturn = createTypeChecker([
    '-: node.argument -> +',
    '+: -> +',
]);

const isMergeable = createTypeChecker([
    '+: -> ExpressionStatement',
    '+: -> BlockStatement',
]);

export const report = () => `Merge 'return' with next sibling`;

export const fix = ({path, nextPath}) => {
    let {node} = nextPath;
    
    if (!nextPath.isBlockStatement()) {
        node = node.expression;
    } else {
        const properties = [];
        
        for (const {label, body} of nextPath.node.body) {
            const property = objectProperty(label, body.expression);
            properties.push(property);
        }
        
        node = objectExpression(properties);
    }
    
    path.node.argument = node;
    remove(nextPath);
};
export const traverse = ({push}) => ({
    ReturnStatement(path) {
        if (!isEmptyReturn(path))
            return;
        
        const nextPath = path.getNextSibling();
        
        if (!isMergeable(nextPath))
            return;
        
        push({
            path,
            nextPath,
        });
    },
});
