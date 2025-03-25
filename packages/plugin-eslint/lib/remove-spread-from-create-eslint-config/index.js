import {types, operator} from 'putout';

const {isSpreadElement} = types;
const {replaceWith} = operator;

export const report = () => `Avoid spread ('...') in 'createEslintConfig'`;

export const fix = (path) => {
    replaceWith(path, path.node.argument);
};

export const traverse = ({push}) => ({
    'createESLintConfig(__array)'(path) {
        for (const argPath of path.get('arguments.0.elements')) {
            if (isSpreadElement(argPath))
                push(argPath);
        }
    },
});
