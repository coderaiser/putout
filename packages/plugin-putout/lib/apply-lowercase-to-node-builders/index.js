import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => `Use lowercased node builders`;

export const fix = (path) => {
    const [first] = path.node.name;
    const other = path.node.name.slice(1);
    
    path.node.name = first.toLowerCase() + other;
};

export const traverse = ({push}) => ({
    CallExpression(path) {
        const calleePath = path.get('callee');
        
        if (!isIdentifier(calleePath))
            return;
        
        const {name} = calleePath.node;
        const [first, second] = name;
        
        if (!/[A-Z]/.test(first))
            return;
        
        if (!/[a-z]/.test(second))
            return;
        
        if (!types[name])
            return;
        
        push(calleePath);
    },
});
