export const report = () => 'Remove quotes from import assertions';

export const replace = () => ({
    'import __imports from "__a" with {"type": "__b"}': 'import __imports from "__a" with {type: "__b"}',
});
