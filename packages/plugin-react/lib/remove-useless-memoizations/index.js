export const report = () => `Avoid memo functions when react compiler activated`;

export const replace = () => ({
    'useMemo(__a, __b)': '__a',
    'useCallback(__a, __b)': '__a',
    'memo(__a)': '__a',
    'React.memo(__a)': '__a',
});
