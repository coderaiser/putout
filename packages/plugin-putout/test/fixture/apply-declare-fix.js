const {operator} = require('putout');
const {declare} = operator;

module.exports.declare = () => ({
    tryCatch: `import tryCatch from 'try-catch'`,
    tryToCatch: `import tryToCatch from 'try-to-catch'`
});
