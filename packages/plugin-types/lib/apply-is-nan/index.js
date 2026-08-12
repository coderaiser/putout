export const report = () => `Use 'isNaN' instead of comparing`;

export const replace = () => ({
    '__a === NaN': 'Number.isNaN(__a)',
});
