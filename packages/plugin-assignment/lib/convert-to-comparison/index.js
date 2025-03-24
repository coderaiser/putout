export const report = () => 'Expected comparison instead of assignment';

export const replace = () => ({
    'if (__a = __b) __body': 'if (__a === __b) __body',
});
