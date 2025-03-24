export const report = () => 'Simplify assignment';

export const match = () => ({
    'const __a = (() => __b)()': check,
    '__a = (() => __b)()': check,
    'var __a = (() => __b)()': check,
});

export const replace = () => ({
    'const {__a} = {__a: __b}': 'const __a = __b',
    'const [__a] = [__b]': 'const __a = __b',
    'const __a = (() => __b)()': 'const __a = __b',
    'var __a = (() => __b)()': 'var __a = __b',
    
    'let {__a} = {__a: __b}': 'let __a = __b',
    'let [__a] = [__b]': 'let __a = __b',
    'let __a = (() => __b)()': 'let __a = __b',
    
    '({__a} = {__a: __b})': '__a = __b',
    '[__a] = [__b]': '__a = __b',
    '__a = (() => __b)()': '__a = __b',
});

function check(vars, path) {
    let is = true;
    
    path.traverse({
        ReturnStatement(path) {
            is = false;
            path.stop();
        },
        VariableDeclaration(path) {
            is = false;
            path.stop();
        },
    });
    
    return is;
}
