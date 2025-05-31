export const report = () => 'Avoid useless conditions';

export const replace = () => ({
    'if (__a?.__b) {__a.__b(__args)}': '__a?.__b(__args)',
    'if (__a?.__b) __a.__b(__args)': '__a?.__b(__args)',
    'if (__a) __b; else __b': '__b',
});
