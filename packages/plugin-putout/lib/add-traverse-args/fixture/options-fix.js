export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const fix = () => {};

export const traverse = ({options}) => ({
    Program() {
        console.log(options.x);
    },
});
