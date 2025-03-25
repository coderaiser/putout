export const report = () => `Use 'import' in ESM`;

export const fix = (path) => {
    path.node.key.value = 'node/no-missing-import';
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-missing-require')
            push(path);
    },
});
