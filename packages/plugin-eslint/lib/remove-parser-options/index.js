'use strict';

const {operator} = require('putout');
const {
    traverseProperties,
    replaceWith,
} = operator;

module.exports.report = () => `Avoid "parserOptions" in FlatConfig`;

module.exports.fix = (path) => {
    replaceWith(path.parentPath, path.node.value);
};

module.exports.traverse = ({push}) => ({
    __object(path) {
        const [languageOptionsPath] = traverseProperties(path, 'languageOptions');
        
        if (!languageOptionsPath)
            return;
        
        const [parserOptionsPath] = traverseProperties(languageOptionsPath, 'parserOptions');
        
        if (!parserOptionsPath)
            return;
        
        const [babelOptionsPath] = traverseProperties(parserOptionsPath, 'babelOptions');
        
        if (babelOptionsPath)
            return;
        
        push(parserOptionsPath);
    },
});
