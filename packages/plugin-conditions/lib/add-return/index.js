export const report = () => `Add return statement`;

export const replace = () => ({
    'if (__a) false': 'if (__a) return false',
    'if (__a) true': 'if (__a) return true',
});
