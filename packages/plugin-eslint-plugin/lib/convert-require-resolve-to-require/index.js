'use strict';

module.exports.report = () => `Convert 'require.resolve()' to 'require()'`;

module.exports.match = () => ({
    'require.resolve(__a)': (vars, path) => {
        return path.parentPath.isObjectProperty();
    },
});

module.exports.replace = () => ({
    'require.resolve(__a)': 'require(__a)',
});
