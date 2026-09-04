import {operator, types} from 'putout';

const {isIdentifier} = types;
const {remove} = operator;

export const report = () => `Avoid useless 'undefined' in assignment pattern object`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const valuePath = path.get('value');
        
        if (!isIdentifier(valuePath.node, {name: 'undefined'}))
            return;
        
        push(path);
    },
});
