export const report = () => `Use 'supertape' instead of 'tape'`;

export const replace = () => ({
    'const tryTo = __': '',
    'const tryToTape = __': '',
    'tryTo(__a)': '__a',
    'tryToTape(__a)': '__a',
    'require("tape")': 'require("supertape")',
});
