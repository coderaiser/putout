'use strict';

module.exports.report = () => `Use 'remove(path)' instead of 'path.remove()'`;

module.exports.replace = () => ({
    'path.remove()': 'remove(path)',
});
