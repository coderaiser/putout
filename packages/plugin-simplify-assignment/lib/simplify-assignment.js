'use strict';

module.exports.report = () => 'Simplify assignment';

module.exports.match = () => ({
    'const __a = (() => __b)()': (vars, path) => {
        let is = true;
        
        path.traverse({
            VariableDeclaration(path) {
                is = false;
                path.stop();
            },
        });
        
        return is;
    },
});

module.exports.replace = () => ({
    'const {__a} = {__a: __b}': 'const __a = __b',
    'const [__a] = [__b]': 'const __a = __b',
    'const __a = (() => __b)()': 'const __a = __b',
    
    'let {__a} = {__a: __b}': 'let __a = __b',
    'let [__a] = [__b]': 'let __a = __b',
    'let __a = (() => __b)()': 'let __a = __b',
    
    '({__a} = {__a: __b})': '__a = __b',
    '[__a] = [__b]': '__a = __b',
    '__a = (() => __b)()': '__a = __b',
});

