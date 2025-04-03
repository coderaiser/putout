export const report = () => `Use 'maybeEmptyArray()'`;

export const filter = ({parentPath}) => !parentPath.isFunction();

export const replace = () => ({
    '!__a ? [] :__a': 'maybeEmptyArray(__a)',
});
