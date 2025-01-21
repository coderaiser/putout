export const match = {
    '__a.__b __expr': ({__expr, __a, __b}, path) => {
        console.log(__a, __b, __expr);
    },
};
