export const report = () => `Use 'gray' instead of 'grey' in 'styleText()'`;

export const replace = () => ({
    'styleText("grey", __a)': 'styleText("gray", __a)',
});
