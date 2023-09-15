module.exports = ({a: c = 1, b: d = 2} = {}) => {
    call({
        all: {
            c,
            d,
        },
    });
};
