import {operator, types} from 'putout';

const {
    isObjectExpression,
    isLogicalExpression,
} = types;

const {replaceWith} = operator;

export const report = () => `Avoid useless 'logical expression' in spread`;

export const fix = (path) => {
    replaceWith(path, path.node.left);
};

export const traverse = ({push}) => ({
    SpreadElement(path) {
        const argumentPath = path.get('argument');
        
        if (!isLogicalExpression(argumentPath))
            return;
        
        const {right} = argumentPath.node;
        
        if (!isEmptyObject(right))
            return;
        
        push(argumentPath);
    },
});

function isEmptyObject(right) {
    if (!isObjectExpression(right))
        return false;
    
    return !right.properties.length;
}
