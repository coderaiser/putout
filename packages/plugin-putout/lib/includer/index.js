export const report = () => 'Includer functions should return array (https://git.io/Jyndl)';

export const replace = () => ({
    'module.exports.include = () => "__a"': 'module.exports.include = ["__a"]',
    'module.exports.exclude = () => "__a"': 'module.exports.exclude = ["__a"]',
    'module.exports.include = __array': 'module.exports.include = () => __array',
    'module.exports.exclude = __array': 'module.exports.exclude = () => __array',
    'module.exports.include = "__a"': 'module.exports.include = ["__a"]',
    'module.exports.exclude = "__a"': 'module.exports.exclude = ["__a"]',
    
    'export const include = () => "__a"': 'export const include = ["__a"]',
    'export const exclude = () => "__a"': 'export const exclude = ["__a"]',
    'export const include = __array': 'export const include = () => __array',
    'export const exclude = __array': 'export const exclude = () => __array',
    'export const include = "__a"': 'export const include = ["__a"]',
    'export const exclude = "__a"': 'export const exclude = ["__a"]',
});
