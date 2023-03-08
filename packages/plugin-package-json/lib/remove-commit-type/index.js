'use strict';

const {operator} = require('putout');
const {
    getProperties,
    remove,
} = operator;

module.exports.report = () => `Remove 'commitType=colon' field of 'package.json', it's colon by default`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)': (path) => {
        const __aPath = path.get('arguments.0');
        const {commitTypePath} = getProperties(__aPath, ['commitType']);
        
        if (!commitTypePath)
            return;
        
        if (commitTypePath.get('value').isStringLiteral({value: 'paren'}))
            return;
        
        push(commitTypePath);
    },
});
