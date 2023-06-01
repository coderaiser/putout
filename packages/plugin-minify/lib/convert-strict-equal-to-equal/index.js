'use strict';

module.exports.report = () => `Use 'equal' instead of 'strict equal'`;

module.exports.replace = () => ({
    '__a === __b': '__a == __b',
});
