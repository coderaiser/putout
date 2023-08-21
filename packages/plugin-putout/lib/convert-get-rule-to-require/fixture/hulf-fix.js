const addPromise = require('./add-promise');
const removeUnusedVariables = require('./remove-unused-variables');
const hello = 'world';

module.exports.rules = {
    'add-promise': addPromise,
    'remove-unused-variables': removeUnusedVariables,
};
