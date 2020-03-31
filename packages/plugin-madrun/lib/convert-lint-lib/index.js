'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;
const {StringLiteral} = types;

module.exports.report = () => `"lint" should be used instead of "lint:lib"`;

module.exports.fix = ({lintLib, fixLint, lint}) => {
    replaceWith(lintLib, lint.node);
    lint.parentPath.remove();
    
    const {body} = fixLint.parentPath.node.value;
    
    body.arguments[0] = StringLiteral('lint');
};

module.exports.traverse = ({push}) => {
    return {
        'module.exports = __object'(path) {
            const rightPath = path.get('right');
            
            const {
                lint,
                lintLib,
                fixLint,
            } = parseObject(rightPath);
            
            if (!lint || !lintLib || !fixLint)
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
    }
    
    return {
        lintLib,
        lint,
        fixLint,
    };
}

