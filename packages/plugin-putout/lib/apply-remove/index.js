'use strict';

module.exports.report = () => `Use 'remove(path)' instead of 'path.remove()'`;

module.exports.replace = () => ({
    '__a.remove()': 'remove(__a)',
});
