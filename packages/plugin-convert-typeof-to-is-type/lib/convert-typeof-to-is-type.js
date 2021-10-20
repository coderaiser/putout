'use strict';

module.exports.report = () => `Use function to check type instead of 'typeof'`;
module.exports.match = () => ({
    'typeof __a === "__b"': (vars, path) => {
        if (path.parentPath.isFunction())
            return false;
        
        if (path.parentPath.parentPath.parentPath?.isFunction())
            return false;
        
        return true;
    },
});

module.exports.replace = () => ({
    'typeof __a === "function"': 'isFn(__a)',
    'typeof __a === "string"': 'isString(__a)',
    'typeof __a === "number"': 'isNumber(__a)',
    'typeof __a === "boolean"': 'isBool(__a)',
});
