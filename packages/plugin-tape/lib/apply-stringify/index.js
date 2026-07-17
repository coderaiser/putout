import {tryCatch} from 'try-catch';

const {parse} = JSON;

export const report = () => `Use 'stringify' instead of passing JSON string`;

export const match = () => ({
    'const __a = stub().returns("__b");': ({__b}) => {
        const [error] = tryCatch(parse, __b.value);
        return !error;
    },
});

export const replace = () => ({
    'const __a = stub().returns("__b");': ({__b}) => {
        return `const __a = stub().returns(stringify(${__b.value}))`;
    },
});
