import {operator, types} from 'putout';

const {
    isCallExpression,
    isIdentifier,
} = types;

const {remove} = operator;

export const report = () => `Avoid useless 'printer' option`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const {value} = path.node;
        
        if (value.value !== 'putout')
            return;
        
        const {parentPath} = path.parentPath;
        
        if (!isCallExpression(parentPath))
            return;
        
        const name = 'createTest';
        
        if (!isIdentifier(parentPath.node.callee, {name}))
            return;
        
        push(path);
    },
});
