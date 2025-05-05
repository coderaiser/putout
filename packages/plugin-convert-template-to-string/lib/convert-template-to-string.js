export const report = () => 'Avoid using Template string with only one expression';

export const match = () => ({
    '`${__a}`': (vars, path) => {
        const {parentPath} = path;
        return !parentPath.isTaggedTemplateExpression();
    },
});

export const replace = () => ({
    '`${__a}`': 'String(__a)',
});
