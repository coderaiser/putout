'use strict';

module.exports.report = () => `Use 'rename(path, from, to)' instead of 'path.scope.rename(from, to)'`;

module.exports.replace = () => ({
    '__a.scope.rename(__b, __c)': 'rename(__a, __b, __c)',
});
