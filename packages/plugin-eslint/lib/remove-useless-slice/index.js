'use strict';

module.exports.report = () => `Avoid useless '.slice()' in Flat Config`;

module.exports.replace = () => ({
    'export default __a.slice()': 'export default __a',
    'module.exports = __a.slice()': 'module.exports = __a',
});
