export const report = () => `Use 'getTokenBefore' instead of 'getTokenOrCommentBefore'`;

export const replace = () => ({
    '__a.getTokenOrCommentBefore(__b)': '__a.getTokenBefore(__b, {includeComments: true})',
    '__a.getTokenOrCommentBefore(__b, __c)': '__a.getTokenBefore(__b, {skip: __c, includeComments: true})',
});
