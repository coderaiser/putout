'use strict';

module.exports.report = () => 'Assignment should be simplified';

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

