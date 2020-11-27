'use strict';

const {
    types,
    operator,
} = require('putout');

const findKey = require('../find-key');
const {
    isStringLiteral,
    TemplateLiteral,
} = types;

const {replaceWith} = operator;

const dotLine = 'putout .';
const isDot = (a) => a.includes(dotLine);

module.exports.report = () => '"lint" should check current directory';

module.exports.fix = ({lintPath}) => {
    const {node} = lintPath;
    
    if (isStringLiteral(node)) {
        node.value = dotLine;
        node.raw = dotLine;
        return;
    }
    
    node.value.raw = dotLine;
    node.value.cooked = dotLine;
    
    replaceWith(lintPath.parentPath, TemplateLiteral([node], []));
};

function getValue(bodyPath) {
    const {node} = bodyPath;
    
    if (bodyPath.isStringLiteral())
        return [bodyPath, node.value];
    
    if (bodyPath.isTemplateLiteral()) {
        const linePath = bodyPath.get('quasis.0');
        const line = linePath.node;
        
        return [linePath, line.value.raw];
    }
    
    return [bodyPath, ''];
}

module.exports.traverse = ({push}) => {
    return {
        'module.exports = __object'(path) {
            const rightPath = path.get('right');
            const lint = findKey('lint', rightPath);
            
            if (!lint)
                return;
            
            const valuePath = lint.parentPath.get('value');
            const bodyPath = valuePath.get('body');
            const [lintPath, str] = getValue(bodyPath);
            
            if (!str)
                return;
            
            if (isDot(str))
                return;
            
            return push({
                path: rightPath,
                lint,
                lintPath,
            });
        },
    };
};

