export const report = () => `Use 't.equal()' instead of 't.equals()''`;

export const replace = () => ({
    't.equals(__a, __b, __c)': 't.equal(__a, __b, __c)',
});
