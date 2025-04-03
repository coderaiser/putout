export const report = () => `Use 'maybeArray()'`;

export const filter = ({parentPath}) => !parentPath.isFunction();

export const replace = () => ({
    'isArray(__a) ? __a : [__a]': 'maybeArray(__a)',
    'Array.isArray(__a) ? __a : [__a]': 'maybeArray(__a)',
});
