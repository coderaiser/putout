export const report = () => 'Avoid useless mapping modifiers';

export const fix = ({node}) => {
    const {optional, readonly} = node;
    
    if (optional === '+')
        node.optional = true;
    
    if (readonly === '+')
        node.readonly = true;
};

export const traverse = ({push}) => ({
    TSMappedType(path) {
        const {optional, readonly} = path.node;
        
        if (optional === '+' || readonly === '+')
            push(path);
    },
});
