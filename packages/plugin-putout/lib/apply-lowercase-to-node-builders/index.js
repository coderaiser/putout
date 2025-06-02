import {types} from 'putout';

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
    ReferencedIdentifier(path) {
        const {name} = path.node;
        const [first, second] = name;
        
        if (!/[A-Z]/.test(first))
            return;
        
        if (!/[a-z]/.test(second) && !name.startsWith('TS'))
            return;
        
        if (!types[name])
            return;
        
        push(path);
    },
});
