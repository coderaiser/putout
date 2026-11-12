import {operator} from 'putout';

const {
    __yaml,
    getTemplateValues,
    traverseProperties,
    remove,
} = operator;

export const report = () => `Remove empty 'needs: []' from GitHub Actions 🐙`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    [__yaml]: (path) => {
        const {__object} = getTemplateValues(path, __yaml);
        const namesPaths = traverseProperties(__object, 'name');
        
        for (const namePath of namesPaths) {
            const valuePath = namePath.get('value');
            const {value} = valuePath.node;
            
            if (value !== 'Typos')
                continue;
            
            const properties = namePath.parentPath.get('properties');
            
            for (const property of properties) {
                if (property.node.key.value !== 'with')
                    continue;
                
                push(property);
            }
        }
    },
});
