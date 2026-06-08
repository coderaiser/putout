import {operator, types} from 'putout';

const {isObjectProperty} = types;
const {rename, getBinding} = operator;

export const report = () => `Avoid useless destructuring rename`;

export const fix = (path) => {
    const {left} = path.node;
    
    rename(path, left.name, path.parentPath.node.key.name);
    path.node.left = path.parentPath.node.key;
    path.parentPath.node.shorthand = true;
};

export const traverse = ({push}) => ({
    AssignmentPattern(path) {
        if (!isObjectProperty(path.parentPath))
            return;
        
        if (path.parentPath.node.shorthand)
            return;
        
        const {name} = path.parentPath.node.key;
        
        if (name === path.node.right.name)
            return;
        
        if (getBinding(path, name))
            return;
        
        push(path);
    },
});
