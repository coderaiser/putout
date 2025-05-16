export const report = () => `Avoid array inside property accessors`;

export const replace = () => ({
    '__a[[__b]]': '__a[__b]',
});
