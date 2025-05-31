export const report = () => `Lexical declaration cannot appear in single-statement-context`;

export const match = () => ({
    'const __a = __b': (vars, path) => {
        return path.parentPath.isIfStatement();
    },
});

export const replace = () => ({
    'const __a = __b': '{const __a = __b}',
});
