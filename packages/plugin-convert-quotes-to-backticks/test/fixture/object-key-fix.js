export const replace = () => ({
    [`''`]: '"")',
});

encode(value, {
    encodeQuote: `'`,
});
