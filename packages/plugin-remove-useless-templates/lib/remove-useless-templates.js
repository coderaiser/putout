export const report = () => 'Avoid using single-expression templates';

export const replace = () => ({
    '`${__a}`': '__a',
});
