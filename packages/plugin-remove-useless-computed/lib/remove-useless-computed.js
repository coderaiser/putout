import {types} from 'putout';

const {isStringLiteral} = types;

export const report = () => `Avoid useless 'computed'`;

export const fix = (path) => {
    path.node.computed = false;
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const {key, computed} = path.node;
        
        if (!computed)
            return false;
        
        if (!isStringLiteral(key))
            return;
        
        push(path);
    },
});
