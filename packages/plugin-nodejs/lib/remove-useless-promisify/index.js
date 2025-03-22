export const report = () => `Calling 'promisify' on a function that returns a Promise is likely a mistake`;

export const replace = () => ({
    'promisify(async (__args) => __body)': 'async (__args) => __body',
});
