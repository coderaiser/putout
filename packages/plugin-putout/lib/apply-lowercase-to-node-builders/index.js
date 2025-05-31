import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => `Use lowercased node builders`;

export const fix = (path) => {
    const {name} = path.node;
    
    if (name.startsWith('TS')) {
        const other = name.slice(2);
        
        path.node.name = `ts${other}`;
        return;
    }
    
    const [first] = name;
    const other = name.slice(1);
    
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
        
        if (!/[a-z]/.test(second) && !name.startsWith('TS'))
            return;
        
        if (!types[name])
            return;
        
        push(calleePath);
    },
});
