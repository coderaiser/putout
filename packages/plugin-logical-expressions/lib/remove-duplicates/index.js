export const report = () => 'Avoid duplicates in logical expressions';

export const replace = () => ({
    '__a || __a': '__a',
    '__a && __a': '__a',
    
    '__a && __b && __a': '__a && __b',
    '__a && __b && __c && __a': '__a && __b && __c',
    
    '__a = __a': '__a',
});
