const addPromise = require('./add-promise');
const hello = 'world';

module.exports.rules = {
    'add-promise': addPromise,
    ...getRule('remove-unused-variables'),
};
