export const report = () => `Avoid 'print' when it is the only method`;

export const replace = () => ({
    'const __a = {print(__args) {__body}}': 'const __a = (__args) => __body',
});
