export const report = () => 'Avoid setter return type';

export const fix = (path) => {
    delete path.node.returnType;
};

export const traverse = ({push}) => ({
    TSMethodSignature(path) {
        const {kind} = path.node;
        
        if (kind !== 'set')
            return;
        
        if (!path.node.returnType)
            return;
        
        push(path);
    },
});
