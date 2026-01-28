export const report = () => '"throw" should be used without body';

export const replace = () => ({
    '(__args) => {throw __a}': '(__args) => throw __a',
});
