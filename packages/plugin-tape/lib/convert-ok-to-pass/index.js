export const report = () => `Use 't.pass()' instead of 't.ok()'`;

export const replace = () => ({
    't.ok(true)': 't.pass()',
});
