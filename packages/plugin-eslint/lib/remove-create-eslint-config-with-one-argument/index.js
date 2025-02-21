'use strict';

module.exports.report = () => `Remove 'createESLintConfig()' with one argument`;

module.exports.replace = () => ({
    'export default createESLintConfig([__a])': 'export default __a',
});
