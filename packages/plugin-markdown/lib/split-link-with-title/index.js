import {operator} from 'putout';

const {
    getTemplateValues,
    __markdown,
    setLiteralValue,
    superTraverse,
} = operator;

export const report = () => `Split link with title`;

export const fix = (path) => {
    const {value} = path.node;
    const newValue = value.replace('"', ' "');
    
    setLiteralValue(path, newValue);
};

export const traverse = ({push}) => ({
    [__markdown]: (path) => {
        superTraverse(path, {
            '__a(__b, __c)': (path) => {
                const {__a, __c} = getTemplateValues(path, '__a(__b, __c)');
                
                if (!/link|definition/.test(__a.name))
                    return;
                
                const __cPath = path.get('arguments.1');
                const {value} = __c;
                
                if (!value.includes('"'))
                    return;
                
                if (value.includes(' "'))
                    return;
                
                push(__cPath);
            },
        });
    },
});
