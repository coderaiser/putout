import {
    types,
    operator,
    template,
} from 'putout';
import {getProperty} from '../get-property.js';

const {replaceWithMultiple} = operator;

const {objectProperty, stringLiteral} = types;

const freshLintScript = template.ast(`
    () => run('lint', '--fresh')
`);

export const report = () => `fresh:lint should exist`;

export const fix = (path) => {
    replaceWithMultiple(path, [path.node, objectProperty(stringLiteral('fresh:lint'), freshLintScript), objectProperty(stringLiteral('lint:fresh'), freshLintScript)]);
};

export const traverse = ({push}) => ({
    'export default  __object': pushLint('declaration', push),
    'module.exports = __object': pushLint('right', push),
});

const pushLint = (selector, push) => (path) => {
    const currentPath = path.get(selector);
    const lint = getProperty(currentPath, 'lint');
    const freshLint = getProperty(currentPath, 'fresh:lint');
    
    if (!lint || freshLint)
        return;
    
    push(lint);
};
