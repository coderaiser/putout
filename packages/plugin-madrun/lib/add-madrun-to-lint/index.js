'use strict';

const {types} = require('putout');

const {
    isIdentifier,
    isTemplateLiteral,
} = types;

module.exports.report = () => '"lint" should check "madrun.js"';

module.exports.fix = ({line}) => {
    const result = line.value.raw.replace('test', 'test madrun.js');
    
    line.value.raw = result;
    line.value.cooked = result;
};

module.exports.traverse = ({push}) => {
    return {
        MemberExpression(path) {
            const {object, property} = path.node;
            
            if (!isIdentifier(object, {name: 'module'}))
                return;
            
            if (!isIdentifier(property, {name: 'exports'}))
                return;
            
            const {parentPath} = path;
            
            if (!parentPath.isAssignmentExpression())
                return;
            
            const rightPath = parentPath.get('right');
            
            if (!rightPath.isObjectExpression())
                return;
            
            const lint = parseObject(rightPath);
            
            if (!lint)
                return;
            
            const value = lint.parentPath.get('value');
            
            if (!value.isFunction())
                return;
            
            const {body} = value.node;
            
            if (!isTemplateLiteral(body))
                return;
            
            const [line] = body.quasis;
            
            if (line.value.raw !== line.value.cooked)
                return;
            
            if (line.value.raw.includes('madrun'))
                return;
            
            push({
                path: rightPath,
                lint,
                line,
            });
        },
    };
};

function parseObject(path) {
    const properties = path.get('properties');
    for (const property of properties) {
        const key = property.get('key');
        
        if (key.isStringLiteral({value: 'lint'})) {
            return key;
        }
    }
    
    return null;
}
