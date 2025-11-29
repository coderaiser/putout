export const report = () => `Use 'getTokenAfter' instead of 'getTokenOrCommentAfter'`;

export const replace = () => ({
    '__a.getTokenOrCommentAfter(__b)': '__a.getTokenAfter(__b, {includeComments: true})',
    '__a.getTokenOrCommentAfter(__b, __c)': '__a.getTokenAfter(__b, {skip: __c, includeComments: true})',
});
