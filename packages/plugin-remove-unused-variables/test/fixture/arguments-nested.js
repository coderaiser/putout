const add = (state, {payload: {a, b}}) => {
    return {
        [a]: b
    };
};

