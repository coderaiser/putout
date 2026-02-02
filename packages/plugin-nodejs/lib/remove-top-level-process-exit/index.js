export const report = () => `Avoid useless 'process.exit()'`;

export const match = () => ({
    'process.exit()': (vars, {parentPath}) => {
        return parentPath.parentPath.isProgram();
    },
});

export const replace = () => ({
    'process.exit()': '',
});
