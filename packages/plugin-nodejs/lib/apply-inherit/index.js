import {types, operator} from 'putout';

const {compare} = operator;
const {isIdentifier, stringLiteral} = types;

export const report = () => `Use 'inherit' instead of 'stdio: [0, 1, 2]'`;

export const fix = (path) => {
    path.node.value = stringLiteral('inherit');
};

export const traverse = ({push}) => ({
    ObjectProperty: (path) => {
        const {key, value} = path.node;
        
        if (!isIdentifier(key, {name: 'stdio'}))
            return;
        
        if (!compare(value, '[0, 1, 2]'))
            return;
        
        push(path);
    },
});
