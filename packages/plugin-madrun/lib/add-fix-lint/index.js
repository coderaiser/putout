import {
    types,
    operator,
    template,
} from 'putout';

const {stringLiteral, objectProperty} = types;
const {
    getProperty,
    replaceWithMultiple,
} = operator;

const fixLintScript = template.ast(`
    () => run('lint', '--fix')
`);

export const report = () => `fix:lint should exist`;

export const fix = (path) => {
    replaceWithMultiple(path, [path.node, objectProperty(stringLiteral('fix:lint'), fixLintScript)]);
};

export const traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const rightPath = path.get('right');
        const lint = getProperty(rightPath, 'lint');
        const fixLint = getProperty(rightPath, 'fix:lint');
        
        if (!lint || fixLint)
            return;
        
        push(lint);
    },
});
