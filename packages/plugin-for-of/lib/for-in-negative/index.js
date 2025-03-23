import {generate, operator} from 'putout';

const {
    contains,
    getTemplateValues,
} = operator;

export const report = () => `for-of should be used instead of for-in`;

export const match = () => ({
    'for (__a in __b) __body': ({__a, __b, __body}) => {
        const declaration = getTemplateValues(__a, 'var __a');
        
        if (!declaration.__a)
            return false;
        
        const {name} = declaration.__a;
        
        return contains(__body, [`if (!${__b.name}.hasOwnProperty(${name})) __c`]);
    },
});

export const replace = () => ({
    'for (__a in __b) __body': ({__b, __body}) => {
        const [first] = __body.body;
        const condition = getTemplateValues(first, 'if (!__b.hasOwnProperty(__a)) __c');
        
        __body.body.shift();
        
        const {code} = generate(__body);
        
        return `for (const ${condition.__a.name} of Object.keys(${__b.name})) ${code}`;
    },
});
