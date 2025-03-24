import {types, operator} from 'putout';

const {
    replaceWith,
    getProperty,
    remove,
} = operator;

const {stringLiteral} = types;

export const report = () => `'lint' should be used instead of 'lint:lib'`;

export const fix = ({lintLib, fixLint, lint}) => {
    replaceWith(lintLib.get('key'), lint.node.key);
    remove(lint);
    
    const {body} = fixLint.node.value;
    
    body.arguments[0] = stringLiteral('lint');
};

export const traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const rightPath = path.get('right');
        
        const lint = getProperty(rightPath, 'lint');
        const lintLib = getProperty(rightPath, 'lint:lib');
        const fixLint = getProperty(rightPath, 'fix:lint');
        
        if (!lint || !lintLib || !fixLint)
            return;
        
        push({
            path: rightPath,
            lint,
            lintLib,
            fixLint,
        });
    },
});
