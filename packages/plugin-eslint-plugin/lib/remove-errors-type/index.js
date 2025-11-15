import {operator, types} from 'putout';

const {isIdentifier} = types;
const {remove} = operator;

export const report = () => `Remove 'type' field`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const {key} = path.node;
        
        if (!isIdentifier(key, {name: 'type'}))
            return;
        
        const {parentPath} = path.parentPath.parentPath;
        
        if (!isIdentifier(parentPath.node.key, {name: 'errors'}))
            return;
        
        push(path);
    },
});
