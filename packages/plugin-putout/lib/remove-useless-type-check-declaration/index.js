import {types} from 'putout';

export const report = () => `Avoid useless 'is-' declaration`;

export const match = () => ({
    'const __a = (__b) => __b.type === "__c"': check,
});

export const replace = () => ({
    'const __a = (__b) => __b.type === "__c"': '',
});

function check({__a, __c}) {
    const name = `is${__c.value}`;
    
    if (!types[name])
        return false;
    
    return name === __a.name;
}
