module.exports = ({a = 1, b = 2} = {}) => {
    call({
        all: {
            c: a,
            d: b,
        },
    });
};
