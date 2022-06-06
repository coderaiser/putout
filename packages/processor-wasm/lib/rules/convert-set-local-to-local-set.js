export const report = () => `Use 'local.set' instead of set_local`;

export const fix = (path) => {
    path.node.id = 'set';
    path.node.object = 'local';
};

export const traverse = ({push}) => ({
    Instr(path) {
        if (path.node.id === 'set_local') {
            push(path);
        }
    },
});

