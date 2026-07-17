import {operator, types} from 'putout';

const {isArrayExpression} = types;

const {
    traverseProperties,
    getTemplateValues,
    __yaml,
    remove,
} = operator;

export const report = () => `Avoid "needs: []"`;

export const fix = (path) => {
    remove(path.parentPath);
};
export const traverse = ({push}) => ({
    [__yaml]: (path) => {
        const {__object} = getTemplateValues(path, __yaml);
        const [needsPath] = traverseProperties(__object, 'needs');
        
        if (!needsPath)
            return;
        
        const needsPathValue = needsPath.get('value');
        
        if (!isArrayExpression(needsPathValue))
            return;
        
        const elements = needsPathValue.get('elements');
        
        if (elements.length)
            return;
        
        push(needsPathValue);
    },
});
