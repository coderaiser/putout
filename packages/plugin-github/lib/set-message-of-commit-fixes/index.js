import {operator} from 'putout';

const {
    traverseProperties,
    getTemplateValues,
    __yaml,
    setLiteralValue,
} = operator;

export const report = () => `Set 'message' of 'Commit fixes'`;

export const fix = ({path, message}) => {
    setLiteralValue(path, message);
};

export const traverse = ({push, options}) => ({
    [__yaml](path) {
        const {message = 'chore: ${{ env.NAME }}: actions: lint ☘️'} = options;
        
        const {__object} = getTemplateValues(path, __yaml);
        
        for (const messagePath of traverseProperties(__object, 'message')) {
            const valuePath = messagePath.get('value');
            const {value} = valuePath.node;
            
            if (value === message)
                break;
            
            push({
                path: valuePath,
                message,
            });
        }
    },
});
