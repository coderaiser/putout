'use strict';

const {types, operator} = require('putout');

const {
    isStringLiteral,
    templateLiteral,
} = types;

const {
    replaceWith,
    getProperty,
    setLiteralValue,
} = operator;

const dotLine = 'putout .';
const isDot = (a) => a.includes(dotLine);

module.exports.report = () => `Use 'lint' to check current drectory`;

module.exports.fix = ({lintPath}) => {
    const {node} = lintPath;
    
    if (isStringLiteral(node))
        return setLiteralValue(node, dotLine);
    
    node.value.raw = dotLine;
    node.value.cooked = dotLine;
    
    replaceWith(lintPath.parentPath, templateLiteral([node], []));
};

function getValue(bodyPath) {
    const {node} = bodyPath;
    
    if (bodyPath.isStringLiteral())
        return [
            bodyPath,
            node.value,
        ];
    
    if (bodyPath.isTemplateLiteral()) {
        const linePath = bodyPath.get('quasis.0');
        const line = linePath.node;
        
        return [
            linePath,
            line.value.raw,
        ];
    }
    
    return [bodyPath, ''];
}

module.exports.traverse = ({push}) => ({
    'export default __object'(path) {
        const declarationPath = path.get('declaration');
        const lintPath = getLintPath(declarationPath);
        
        if (!lintPath)
            return;
        
        push({
            path: lintPath,
            lintPath,
        });
    },
    
    'module.exports = __object'(path) {
        const rightPath = path.get('right');
        const lintPath = getLintPath(rightPath);
        
        if (!lintPath)
            return;
        
        return push({
            path: rightPath,
            lintPath,
        });
    },
});

function getLintPath(path) {
    const lint = getProperty(path, 'lint');
    
    if (!lint)
        return null;
    
    const valuePath = lint.get('value');
    const bodyPath = valuePath.get('body');
    const [lintPath, str] = getValue(bodyPath);
    
    if (!str)
        return null;
    
    if (isDot(str))
        return null;
    
    return lintPath;
}
