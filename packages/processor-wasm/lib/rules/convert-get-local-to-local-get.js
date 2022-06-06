export const report = () => `Use 'local.get' instead of get_local`;

export const fix = (path) => {
    path.node.id = 'get';
    path.node.object = 'local';
};

export const traverse = ({push}) => ({
    Instr(path) {
        if (path.node.id === 'get_local')
            push(path);
    },
});

