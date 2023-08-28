export const report = () => 'Useless functions should be avoided';

export const exclude = () => [
    '(__args__a) => __args__a()',
];

export const replace = () => ({
    '(__args__a) => __identifier__a(__args__a)': '__identifier__a',
    '(__args__a) => {__identifier__a(__args__a)}': '__identifier__a',
});
