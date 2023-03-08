'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    StringLiteral,
    ObjectProperty,
} = types;

const {getProperties} = operator;

module.exports.report = () => `Set 'commitType'`;

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)': (path) => {
        const __aPath = path.get('arguments.0');
        const {commitTypePath, mainPath} = getProperties(__aPath, [
            'commitType',
            'main',
        ]);
        
        if (commitTypePath)
            return;
        
        if (!mainPath)
            return;
        
        push({
            path,
            mainPath,
        });
    },
});

module.exports.fix = ({mainPath}) => {
    const commitTypeNode = ObjectProperty(StringLiteral('commitType'), StringLiteral('colon'));
    mainPath.insertAfter(commitTypeNode);
};
