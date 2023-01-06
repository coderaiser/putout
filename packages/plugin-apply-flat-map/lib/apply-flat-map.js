'use strict';

module.exports.report = () => `Use '.flatMap()' instead of '.map().flat()'`;

module.exports.replace = () => ({
    '__a.map(__b).flat()': '__a.flatMap(__b)',
});

