import {operator} from 'putout';

const {
    traverseProperties,
    replaceWith,
} = operator;

export const report = () => `Avoid "parserOptions" in FlatConfig`;

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
        
        const [babelOptionsPath] = traverseProperties(parserOptionsPath, 'babelOptions');
        const [ecmaFeatures] = traverseProperties(parserOptionsPath, 'ecmaFeatures');
        
        if (ecmaFeatures || babelOptionsPath)
            return;
        
        push(parserOptionsPath);
    },
});
