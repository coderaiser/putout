'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;

const {
    isIdentifier,
    isCallExpression,
    StringLiteral,
} = types;

module.exports.report = () => `"lint" should be used instead of "lint:lib"`;

module.exports.fix = ({lintLib, fixLint, lint}) => {
    replaceWith(lintLib, lint.node);
    lint.parentPath.remove();
    
    const {body} = fixLint.parentPath.node.value;
    
    if (!isCallExpression(body))
        return;
    
    body.arguments[0] = StringLiteral('lint');
};

module.exports.traverse = ({push}) => {
    return {
        'module.exports = {}'(path){
            const rightPath = path.get('right');
            
            const {
                isLintMore,
                lint,
                lintLib,
                fixLint,
            } = parseObject(rightPath);
            
            if (isLintMore || !lint || !lintLib || !fixLint)
                return;
            
            push({
                path: rightPath,
                lint,
                lintLib,
                fixLint,
            });
        },
    };
};

function parseObject(path) {
    
    let lintLib = null;
    let lint = null;
    let fixLint = null;
    let isLintMore = false;
    
    const properties = path.get('properties');
    for (const property of properties) {
        const key = property.get('key');
        
        if (key.isStringLiteral({value: 'lint:lib'})) {
            lintLib = key;
            continue;
        }
        
        if (key.isStringLiteral({value: 'lint'})) {
            lint = key;
            continue;
        }
        
        if (key.isStringLiteral({value: 'fix:lint'})) {
            fixLint = key;
            continue;
        }
        
        if (key.isStringLiteral() && /^lint:/.test(key.value)) {
            isLintMore = true;
            continue;
        }
    }
    
    return {
        isLintMore,
        lintLib,
        lint,
        fixLint,
    };
}

