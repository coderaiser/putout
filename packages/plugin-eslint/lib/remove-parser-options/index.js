import {operator} from 'putout';

const {keys} = Object;
const {
    traverseProperties,
    getProperties,
    replaceWith,
} = operator;

export const report = () => `Avoid 'parserOptions' in FlatConfig`;

export const fix = (path) => {
    replaceWith(path.parentPath, path.node.value);
};

export const traverse = ({push}) => ({
    __object(path) {
        const [languageOptionsPath] = traverseProperties(path, 'languageOptions');
        
        if (!languageOptionsPath)
            return;
        
        const [parserOptionsPath] = traverseProperties(languageOptionsPath, 'parserOptions');
        
        if (!parserOptionsPath)
            return;
        
        const [parserPath] = traverseProperties(languageOptionsPath, 'parser');
        
        if (parserPath)
            return false;
        
        const names = [
            'babelOptions',
            'ecmaFeatures',
            'projectService',
            'tsconfigRootDir',
        ];
        
        const parserOptionsValuePath = parserOptionsPath.get('value');
        const properties = getProperties(parserOptionsValuePath, names);
        const count = keys(properties).length;
        
        if (count)
            return;
        
        push(parserOptionsPath);
    },
});
