'use strict';

module.exports.report = () => 'Includer functions should return array (https://git.io/Jyndl)';

module.exports.replace = () => ({
    'module.exports.include = () => "__a"': 'module.exports.include = ["__a"]',
    'module.exports.exclude = () => "__a"': 'module.exports.exclude = ["__a"]',
    
    'module.exports.include = ["__a"]': 'module.exports.include = () => ["__a"]',
    'module.exports.exclude = ["__a"]': 'module.exports.exclude = () => ["__a"]',
    
    'module.exports.include = "__a"': 'module.exports.include = ["__a"]',
    'module.exports.exclude = "__a"': 'module.exports.exclude= ["__a"]',
});
