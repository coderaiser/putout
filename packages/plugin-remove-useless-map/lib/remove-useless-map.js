import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => 'Avoid useless map';

export const match = () => ({
    'const [__a] = __b.map((__c) => __d)': ({__a, __c}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        if (!isIdentifier(__c))
            return false;
        
        if (path.scope.bindings[__c.name])
            return false;
        
        return !path.scope.bindings[__c.name];
    },
});

export const replace = () => ({
    '__a.map((__b) => __b)': '__a',
    'const [__a] = __b.map((__c) => __d)': ({__a, __c}) => {
        return ` {
            const [${__c.name}] = __b;
            const ${__a.name} = __d;
        }`;
    },
});
