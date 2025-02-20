'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {isSpreadElement} = types;

module.exports.report = () => `Use 'createESLintConfig()' instead of spread ('...')`;

module.exports.match = () => ({
    'module.exports = __array': hasSpreads({
        selector: 'right.elements',
    }),
    'export default __array': hasSpreads({
        selector: 'declaration.elements',
    }),
});

module.exports.replace = () => ({
    'module.exports = __array': extractSpreads({
        selector: 'right.elements',
        template: 'module.exports = createESLintConfig(__array)',
    }),
    'export default __array': extractSpreads({
        selector: 'declaration.elements',
        template: 'export default createESLintConfig(__array)',
    }),
});

const hasSpreads = ({selector}) => (vars, path) => {
    const elements = path.get(selector);
    
    for (const element of elements) {
        if (isSpreadElement(element))
            return true;
    }
    
    return false;
};

const extractSpreads = ({selector, template}) => (vars, path) => {
    const elements = path.get(selector);
    
    for (const element of elements) {
        if (!isSpreadElement(element))
            continue;
        
        replaceWith(element, element.node.argument);
    }
    
    return template;
};
