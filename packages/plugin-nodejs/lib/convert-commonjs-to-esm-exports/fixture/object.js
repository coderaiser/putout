const {parseRules} = require('./parse-rules');
const {mergeRules} = require('./merge-rules');

module.exports = {
    parseRules,
    mergeRules: _mergeRules,
};
