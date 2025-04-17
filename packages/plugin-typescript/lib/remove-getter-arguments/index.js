export const report = () => 'Avoid getter arguments';

export const fix = (path) => {
    path.node.params = [];
};

export const traverse = ({push}) => ({
    TSMethodSignature(path) {
        const {kind} = path.node;
        
        if (kind !== 'get')
            return;
        
        if (!path.node.params.length)
            return;
        
        push(path);
    },
});
